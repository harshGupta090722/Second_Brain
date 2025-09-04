import express from "express";
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from "./db.js";
import { JWT_PASSWORD } from "./config.js";
import { userMiddleware } from "./middleware.js";
import { random } from "./util.js";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv"
dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.use(cors());
declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

app.post("/api/v1/signup", async (req, res) => {

    const { username, password } = req.body;
    try {
        const existingUser = await UserModel.findOne({ username: username });
        if (existingUser) {
            return res.status(400).json({ errors: "User already exists" });
        }


        await UserModel.create({
            username,
            password
        })
        res.status(200).json({
            message: "User Signed Up"
        })
    } catch (error) {
        res.status(404).json({
            message: "Some Error occured"
        })
    }
})

app.post("/api/v1/signin", async (req, res) => {
    const { username, password } = req.body;

    const existingUser = await UserModel.findOne({
        username,
        password
    })

    if (existingUser) {
        const token = jwt.sign({
            id: existingUser._id
        }, JWT_PASSWORD)
        res.json({
            message: "You are Signed In !",
            token,
            username: username
        });
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
})

app.post("/api/v1/logout", userMiddleware, (req, res) => {
    console.log("Logging out user Id:", req.userId);

    res.status(200).json({ message: "Logout successful" });
})

app.post("/api/v1/content", userMiddleware, async (req, res) => {
    try {
        const { title, link, type } = req.body;
        await ContentModel.create({
            title,
            link,
            type,
            userId: req.userId,
            tags: []
        })
        return res.json({
            message: "Content added"
        })
    } catch (error) {
        console.error("Error creating content", error);
        return res.status(500).json({ error: "Failed to add Content" });
    }
})

//Get all Posts/Contents
app.get("/api/v1/content", userMiddleware, async (req, res) => {
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId", "username")
    res.json({
        content,
        message: "Here is your content"
    })
})

//Filter posts
app.get("/api/v1/content/:type", userMiddleware, async (req, res) => {
    const userId = req.userId;
    const type = req.params.type;
    try {
        const typecontent = await ContentModel.find({
            userId,
            type
        });

        res.json({
            content: typecontent,
            message: `Here are you all ${type} Posts`
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error })
    }
});

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    try {
        const { contentId } = req.body;

        const result = await ContentModel.deleteOne({
            _id: new mongoose.Types.ObjectId(contentId),
            userId: req.userId
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Content not found" });
        }
        res.status(200).json({ message: "Content deleted successfully" });
    } catch (err: any) {
        res.status(500).json({ message: "Something went wrong", error: err.message });
    }
});

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const share = req.body.share;
    if (share) {
        const existingLink = await LinkModel.findOne({
            userId: req.userId
        })
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            })
            return;
        }
        const hash = random(10);
        await LinkModel.create({
            userId: req.userId,
            hash: hash
        })
        res.json({
            message: "/share/" + hash
        })
    } else {
        await LinkModel.deleteOne({
            userId: req.userId,
        });

        res.json({
            message: "Removed link"
        })
    }
})

app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;
    const link = await LinkModel.findOne({
        hash
    })

    if (!link) {
        res.status(404).json({
            message: "Sorry Incorrect Input"
        })
        return;
    }

    //userId
    const content = await ContentModel.find({
        userId: link.userId
    })

    const user = await UserModel.findOne({
        _id: link.userId
    })

    if (!user) {
        res.status(404).json({
            message: "user not found,error should ideally not happen !"
        })
        return;
    }

    res.json({
        username: user.username,
        conetnt: content
    })
})

app.listen(port, () => {
    console.log("Server is running on port 3000");
});