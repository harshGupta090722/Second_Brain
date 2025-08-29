import express from "express";
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from "./db.js";
import { JWT_PASSWORD } from "./config.js";
import { userMiddleware } from "./middleware.js";
import { random } from "./util.js";
const app = express();
app.use(express.json());
import cors from "cors"

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

app.delete("/api/v1/content", async (req, res) => {
    const contentId = req.body.contentId;

    await ContentModel.deleteMany({
        contentId,
        //@ts-ignore
        userId: req.userId
    })
})

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

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});