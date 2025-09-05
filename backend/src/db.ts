import mongoose, { model, Schema } from "mongoose"
import { MONGODB_URL } from "./config.js";


if (!MONGODB_URL) {
    throw new Error("❌ MONGODB_URL is not defined in environment variables");
}

mongoose
    .connect(MONGODB_URL)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err));


const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: String
})


export const UserModel = model("User", UserSchema);


const ContentSchema = new Schema({
    title: String,
    link: String,
    type: String,
    tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],//This is a foreign key
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true } //This is a foreign key
})

export const ContentModel = model("Content", ContentSchema)

const LinkSchema = new Schema({
    hash: String,
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true },
})

export const LinkModel = model("Links", LinkSchema)