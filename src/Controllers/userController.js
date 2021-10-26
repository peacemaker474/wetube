// GlobalRouter Section

export const join = (req, res) => {
    res.send("Join");
};

export const login = (req, res) => {
    res.send("Login");
};

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