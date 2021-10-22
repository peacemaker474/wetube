const trending = (req, res) => {
    res.send("Home Page Videos");
};

const handleWatchVideos = (req, res) => {
    res.send("Watch");
}

const handleEditVideos = (req, res) => {
    res.send("Edit");
}

export {trending, handleWatchVideos, handleEditVideos};