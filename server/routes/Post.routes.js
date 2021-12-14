const express = require('express');
const router = express.Router();
const Post = require('../models/post.models');
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require("stream").pipeline);

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



module.exports = router;