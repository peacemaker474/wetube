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

export const handleSeeVideo = (req, res) => {
    const { id } = req.params;
    return res.render("watch", { pageTitle : `Watching `});
}

export const handleGetEditVideo = (req, res) => {
    const { id } = req.params;
    return res.render("videoEdit", {pageTitle : `Editing`});
}

export const handlePostEditVideo = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
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
            hashtags: hashtags.split(",").map(word => `#${word}`),
        });
        return res.redirect("/");
    } catch(error) {
        return res.render("videoUpload", {
            pageTitle: "Upload Video", 
            errorMessage: error._message
        });
    }
};

export const handleDeleteVideo = (req, res) => {
    res.send("Delete Video");
};