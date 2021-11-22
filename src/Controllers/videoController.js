import VideoModel from "../models/Video";

// GlobalRouter Section
export const home = async (req, res) => {
    try{
        const videos = await VideoModel.find({}).sort({createdAt: "asc"});
        return res.render("home", { pageTitle: "Home", videos });
    } catch {
        return res.render("Server-Error");
    }
}
export const search = async (req, res) => {
    const { keyword } = req.query;
    let videos = [];
    if (keyword) {
        videos = await VideoModel.find({
            title: {
                $regex: new RegExp(keyword, "i"),
            },
        })
    }
    return res.render("search", { pageTitle: "Search", videos });
}

// VideoRouter Section

export const handleSeeVideo = async (req, res) => {
    const { id } = req.params;
    const video = await VideoModel.findById(id);
    if (!video) {
        return res.render("404", { pageTitle: "Video not found." });
    }
    return res.render("watch", { pageTitle : video.title, video});
}

export const handleGetEditVideo = async (req, res) => {
    const { id } = req.params;
    const video = await VideoModel.findById(id);
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video not found." });
    }
    return res.render("videoEdit", {pageTitle : `Edit: ${video.title}`, video});
}

export const handlePostEditVideo = async (req, res) => {
    const { id } = req.params;
    const { title, description, hashtags } = req.body;
    const video = await VideoModel.exists({_id: id});
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video not found." });
    }
    await VideoModel.findByIdAndUpdate(id, {
        title,
        description,
        hashtags:VideoModel.formatHashtags(hashtags),
    })
    return res.redirect(`/videos/${id}`);
};

export const handleGetUploadVideo = (req, res) => {
    return res.render("videoUpload", {pageTitle: "Upload Video"})
};

export const handlePostUploadVideo = async (req, res) => {
    const { path: fileUrl } = req.file;
    const { title, description, hashtags } = req.body;
    try {
        await VideoModel.create({
            title,
            description,
            fileUrl,
            hashtags:VideoModel.formatHashtags(hashtags),
        });
        return res.redirect("/");
    } catch(error) {
        return res.status(400).render("videoUpload", {
            pageTitle: "Upload Video", 
            errorMessage: error._message
        });
    }
};

export const handleDeleteVideo = async (req, res) => {
    const { id } = req.params;
    await VideoModel.findByIdAndDelete(id);
    return res.redirect("/");
};