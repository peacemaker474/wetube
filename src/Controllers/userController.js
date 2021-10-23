// GlobalRouter Section

const join = (req, res) => {
    res.send("Join");
};

const login = (req, res) => {
    res.send("Login");
}

// UserRotuer Section

const handleSeeUser = (req, res) => {
    res.send("My Profile");
}

const handleEditUser = (req, res) => {
    res.send("Edit User");
}

const handleDeleteUser = (req, res) => {
    res.send("Delete User");
}

const handleLogOut = (req, res) => {
    res.send("LogOut");
}


export {
    join, 
    login, 
    handleEditUser, 
    handleDeleteUser,
    handleSeeUser,
    handleLogOut
};