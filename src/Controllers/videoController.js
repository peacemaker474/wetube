let videos = [
    {
        title: "First Video",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes ago",
        views: 1,
        id: 1
    },
    {
        title: "Second Video",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes ago",
        views: 59,
        id: 2
    },
    {
        title: "Third Video",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes ago",
        views: 59,
        id: 3
    },
];

// GlobalRouter Section
const trending = (req, res) => {
    return res.render("home", { pageTitle: "Home", videos });
}
const search = (req, res) => res.send("Search Video");

// VideoRouter Section

const handleSeeVideo = (req, res) => {
    const { id } = req.params;
    const video = videos[id - 1];
    return res.render("watch", { pageTitle : `Watching: ${video.title}`, video });
}

const handleGetEditVideo = (req, res) => {
    const { id } = req.params;
    const video = videos[id - 1];
    return res.render("videoEdit", {pageTitle : `Editing: ${video.title}`, video});
}

const handlePostEditVideo = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    videos[id - 1].title = title;
    return res.redirect(`/videos/${id}`);
};

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
    handleGetEditVideo,
    handlePostEditVideo,
    handleDeleteVideo,
    handleUploadVideo,
};