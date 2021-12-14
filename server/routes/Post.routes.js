const express = require('express');
const router = express.Router();
const Post = require('../models/post.models');
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require("stream").pipeline);

// @routes api/posts/
// @routes GET posts
// @access Private
router.get("/", async (req, res) => {
    Post.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log("Error to get data: " + err);
    }).sort({ createdAt: -1 });
});

// @routes api/posts/
// @routes POST post
// @access Private
router.post("/", async (req, res) => {
    const newPost = new Post({
        posterId: req.body.posterId,
        message: req.body.message,
        video: req.body.video,
        likers: [],
        comments: [],
    });

    try {
        const post = await newPost.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// @routes api/posts/:id
// @routes PUT post
// @access private
router.put("/:id", async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown: " + req.params.id);

    const updatedRecord = {
        message: req.body.message,
    };

    Post.findByIdAndUpdate(
        req.params.id,
        { $set: updatedRecord },
        { new: true },
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Update error: " + err);
        }
    );
});

module.exports = router;