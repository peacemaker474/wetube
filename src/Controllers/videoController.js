import VideoModel from "../models/Video";

// GlobalRouter Section
export const home = async (req, res) => {
    try{
        const videos = await VideoModel.find({});
        return res.render("home", { pageTitle: "Home", videos });
    } catch {
        return res.render("Server-Error");
    }
}
export const search = (req, res) => res.send("Search Video");

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
        return res.render("404", { pageTitle: "Video not found." });
    }
    return res.render("videoEdit", {pageTitle : `Edit: ${video.title}`, video});
}

export const handlePostEditVideo = async (req, res) => {
    const { id } = req.params;
    const { title, description, hashtags } = req.body;
    const video = await VideoModel.exists({_id: id});
    if (!video) {
        return res.render("404", { pageTitle: "Video not found." });
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
    const { title, description, hashtags } = req.body;
    try {
        await VideoModel.create({
            title,
            description,
            hashtags:VideoModel.formatHashtags(hashtags),
        });
        return res.redirect("/");
    } catch(error) {
        return res.render("videoUpload", {
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