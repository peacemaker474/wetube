import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    socialOnly: { type: Boolean, default: false },
    avatarUrl: String,
    password: { type: String },
    name: { type: String, required: true },
    location: String,
    videos: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
    }],
});

userSchema.pre("save", async function() {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 5);
    }
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;