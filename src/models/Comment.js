import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
    text: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    video: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Video" },
    createdAt: { type: String, required: true, default: Date.now },
});

const CommentModel = mongoose.model("Comment", commentSchema);

export default CommentModel;