import UserModel from '../models/User';
import VideoModel from '../models/Video';
import fetch from 'node-fetch';
import bcrypt from 'bcrypt';

// GlobalRouter Section

export const getJoin = (req, res) => {
    return res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
    const { name, email, username, password, password2, location} = req.body;
    const pageTitle = "Join";
    const exists = await UserModel.exists({$or: [{username}, {email}]});
    if (password !== password2) {
        return res.status(400).render("join", {
            pageTitle, 
            errorMessage: "Password confirmation does not match."
        });
    }
    if (exists) {
        return res.status(400).render("join", {
            pageTitle,
            errorMessage: "This username/email is already taken."
        });
    }
    try {
        await UserModel.create({
            name,
            username,
            email,
            password,
            location,
        });
        return res.redirect("/login");
    } catch (error) {
        return res.status(400).render("join", {
            pageTitle,
            errorMessage: error._message,
        })
    }
}

export const getLogin = (req, res) => {
    return res.render("login", {pageTitle: "Login"});
};

export const postLogin = async (req, res) => {
    const { username, password } = req.body;
    const pageTitle = "Login";
    const user = await UserModel.findOne({ username, socialOnly: false });
    const ok = await bcrypt.compare(password, user.password);
    
    // check if account exists
    if (!user) {
        return res.status(400).render("login", {
            pageTitle,
            errorMessage: "An account with this username does not exists."
        });
    }
    // check if password correct
    if (!ok){
        return res.status(400).render("login", {
            pageTitle,
            errorMessage: "Wrong password"
        });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
}

export const handleStartGithubLogin = (req, res) => {
    const baseUrl = "https://github.com/login/oauth/authorize";
    const config = {
        client_id: process.env.GH_CLIENT,
        allow_signup: false,
        scope:  "read:user user:email"
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    return res.redirect(finalUrl);
};

export const handleFinishGithubLogin = async (req, res) => {
    const baseUrl = "https://github.com/login/oauth/access_token";
    const config = {
        client_id: process.env.GH_CLIENT,
        client_secret: process.env.GH_SECRET,
        code: req.query.code,
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    const tokenRequest = await (
        await fetch(finalUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
            }
        })
    ).json();
    if ("access_token" in tokenRequest) {
        const {access_token} = tokenRequest;
        const apiUrl = "https://api.github.com";
        const userData = await (
            await fetch(`${apiUrl}/user`, {
                headers: {
                    Authorization: `token ${access_token}`,
                },
            })
        ).json();
        const emailData = await (
            await fetch(`${apiUrl}/user/emails`, {
                headers: {
                    Authorization: `token ${access_token}`,
                },
            })
        ).json();
        const emailObj = emailData.find(email => email.primary === true && email.verified === true);
        if (!emailObj) {
            return res.redirect("/login");
        }
        let user = await UserModel.findOne({ email: emailObj.email });
        if (!user) {
            user = await UserModel.create({
                name: userData.name ?? userData.login,
                username: userData.login,
                email: emailObj.email,
                password: "",
                socialOnly: true,
                location: userData.location,
                avatarUrl: userData.avatar_url,
            });
        }
        req.session.loggedIn = true;
        req.session.user = user;
        return res.redirect("/");
    } else {
        return res.redirect("/login");
    }
};


// UserRotuer Section

export const handleSeeUser = async (req, res) => {
    const { id } = req.params;
    const user = await UserModel.findById(id).populate("videos");
    if (!user) {
        return res.status(404).render("404", {pageTitle: "User not found"});
    }
    
    return res.render("users/profile", {
        pageTitle: user.name,
        user,
    });
};

export const getEditUser = (req, res) => {
    return res.render("users/edit-profile", {pageTitle: "Edit Profile"})
};

export const postEditUser = async (req, res) => {
    const {
        session: {
            user: { _id, avatarUrl },
        },
        body: { name, username, email, location },
        file
    } = req;
    const userExists = await UserModel.exists({
        _id: { $ne: _id},
        $or: [{username}, {email}],
    });
    if (userExists) {
        return res.status(400).render("users/edit-profile", {
            pageTitle: "Edit Profifle",
            errorMessage: "User alredy exist",
        });
    }
    const updateUser = await UserModel.findByIdAndUpdate(_id, {
        name,
        username,
        email,
        location,
        avatarUrl: file ? file.path : avatarUrl,
    }, {new: true});
    req.session.user = updateUser;
    return res.redirect("/users/edit");
}

export const getChangePassword = (req, res) => {
    if (req.session.user.socialOnly === true) {
        return res.redirect("/");
    }
    return res.render("users/change-password", {pageTitle: "Change Password"});
};

export const postChangePassword = async (req, res) => {
    const {
        session: {
            user: { _id },
        },
        body: { oldPassword, newPassword, newPasswordConfirmation }
    } = req;
    const user = await UserModel.findById(_id);
    const ok = await bcrypt.compare(oldPassword, user.password);
    if (!ok) {
        return res.status(400).render("users/change-password", {
            pageTitle: "Change Password",
            errorMessage: "The current password is incorrect",
        });
    }
    if (newPassword !== newPasswordConfirmation) {
        return res.status(400).render("users/change-password", {
            pageTitle: "Change Password",
            errorMessage: "The password does not match the confirmation",
        });
    }
    user.password = newPassword;
    await user.save();
    return res.redirect("/users/logout");
}

export const handleDeleteUser = (req, res) => {
    res.send("Delete User");
};

export const handleLogOut = (req, res) => {
    req.session.destroy();
    return res.redirect("/")
};