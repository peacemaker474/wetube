// GlobalRouter Section

const trending = (req, res) => {
    res.send("Home Page Videos");
};

const search = (req, res) => {
    res.send("Search Video");
}

// VideoRouter Section

const handleSeeVideo = (req, res) => {
    res.send("Watch");
}

const handleEditVideo = (req, res) => {
    res.send("Edit");
}

const handleDeleteVideo = (req, res) => {
    res.send("Delete Video");
}

const handleUploadVideo = (req, res) => {
    res.send("Uploda Video");
}

export {
    trending, 
    search, 
    handleSeeVideo, 
    handleEditVideo,
    handleDeleteVideo,
    handleUploadVideo,
};