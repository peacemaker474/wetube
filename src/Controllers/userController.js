import UserModel from '../models/User';
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
    const user = await UserModel.findOne({ username });
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

// UserRotuer Section

export const handleSeeUser = (req, res) => {
    res.send("My Profile");
};

export const handleEditUser = (req, res) => {
    res.send("Edit User");
};

export const handleDeleteUser = (req, res) => {
    res.send("Delete User");
};

export const handleLogOut = (req, res) => {
    res.send("LogOut");
};