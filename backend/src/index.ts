import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ContentModel, UserModel } from "./db.js";
import { JWT_PASSWORD } from "./config.js";
import { userMiddleware } from "./middleware.js";
const app = express();
app.use(express.json());


app.post("/api/v1/signup", async (req, res) => {

    const { username, password } = req.body;
    try {
        await UserModel.create({
            username,
            password
        })
        res.json({
            message: "User Signed Up"
        })
    } catch (error) {
        res.status(411).json({
            message: "User already exists"
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
            messag: "You are Signed In !",
            token
        });
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
})

app.post("/api/v1/content", userMiddleware, async (req, res) => {
    try {
        const { link, type } = req.body;
        await ContentModel.create({
            link,
            type,
            //@ts-ignore
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

app.get("/api/v1/content", userMiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId", "username")
    res.json({
        content
    })
})

app.delete("/api/v1/content", async (req, res) => {
    const contentId = req.body.contentId;

    await ContentModel.deleteMany({
        contentId,
        //@ts-ignore
        userId: req.userId
    })
})

app.post("/api/v1/brain/share", (req, res) => {

})

app.get("/api/v1/brain/:shareLink", (req, res) => {

})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});