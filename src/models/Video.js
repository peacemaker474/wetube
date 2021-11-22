import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    fileUrl: { type: String, required: true},
    title: { type: String, required: true, trim: true},
    description: { type: String, required: true, trim: true},
    createdAt: { type: Date, default: Date.now, required: true },
    hashtags: [{ type: String, trim: true }],
    meta: {
        views: { type: Number, default: 0, required: true },
    },
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
});

videoSchema.static("formatHashtags", function(hashtags) {
    return hashtags.split(",").map(word => word.startsWith("#") ? word : `#${word}`);
})


const VideoModel = mongoose.model("Video", videoSchema);

export default VideoModel;