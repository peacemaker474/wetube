import VideoModel from "../models/Video";
import UserModel from "../models/User";

// GlobalRouter Section
export const home = async (req, res) => {
    try{
        const videos = await VideoModel.find({}).sort({createdAt: "desc"}).populate("owner");
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
        }).populate("owner");
    }
    return res.render("search", { pageTitle: "Search", videos });
}

// VideoRouter Section

export const handleSeeVideo = async (req, res) => {
    const { id } = req.params;
    const video = await VideoModel.findById(id).populate("owner");
    
    if (!video) {
        return res.render("404", { pageTitle: "Video not found." });
    }
    return res.render("watch", { pageTitle : video.title, video});
}

export const handleGetEditVideo = async (req, res) => {
    const { id } = req.params;
    const {
        user: { _id }
    } = req.session;
    const video = await VideoModel.findById(id);
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video not found." });
    }
    if (String(video.owner) !== String(_id)) {
        return res.status(403).redirect("/");
    }
    return res.render("videoEdit", {pageTitle : `Edit: ${video.title}`, video});
}

export const handlePostEditVideo = async (req, res) => {
    const { id } = req.params;
    const { title, description, hashtags } = req.body;
    const {
        user: { _id }
    } = req.session;
    const video = await VideoModel.exists({_id: id});
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video not found." });
    }
    if (String(video.owner) !== String(_id)) {
        return res.status(403).redirect("/");
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
    const {
        user : { _id }
    } = req.session;
    const { video, thumb } = req.files;
    const { title, description, hashtags } = req.body;
    try {
        const newVideo = await VideoModel.create({
            title,
            description,
            fileUrl: video[0].path,
            thumbUrl: thumb[0].path,
            owner: _id,
            hashtags:VideoModel.formatHashtags(hashtags),
        });
        const user = await UserModel.findById(_id);
        user.videos.push(newVideo._id);
        user.save();
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
    const {
        user: { _id }
    } = req.session;
    const video = await VideoModel.findById(id);
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video not found." });
    }
    if (String(video.owner) !== String(_id)) {
        return res.status(403).redirect("/");
    }
    await VideoModel.findByIdAndDelete(id);
    return res.redirect("/");
};

export const registerView = async (req, res) => {
    const { id } = req.params;
    const video = await VideoModel.findById(id);
    if (!video) {
        return res.sendStatus(404);
    }
    video.meta.views = video.meta.views + 1;
    await video.save();
    return res.sendStatus(200);
}