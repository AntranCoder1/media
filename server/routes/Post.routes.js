const express = require('express');
const router = express.Router();
const Post = require('../models/post.models');
const User = require('../models/user.models');
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

// @routes api/posts/:id
// @routes DELETE post
// @access private
router.delete("/:id", async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown: " + req.params.id);

    Post.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) res.status(200).json(docs);
        else console.log("Delete error : " + err);
    });
});

// @routes api/posts/like-post/:id
// @routes PATCH post
// @access private
router.patch("/like-post/:id", async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown: " + req.params.id);

    try {
        await Post.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { likers: req.body.id } },
            { new: true },
            (err, docs) => {
                if (err) return res.status(400).send(err);
            }
        );

        await User.findByIdAndUpdate(
            req.body.id,
            { $addToSet: { likes: req.params.id } },
            { new: true },
            (err, docs) => {
                if (!err) res.status(200).json(docs);
                else return res.status(400).send(err);
            }
        );
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// @routes api/posts/unlike-post/:id
// @routes PATCH post
// @access private
router.patch("/unlike-post/:id", async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown: " + req.params.id);

    try {
        await Post.findByIdAndUpdate(
            req.params.id,
            { $pull: { likers: req.body.id } },
            { new: true },
            (err, docs) => {
                if (err) return res.status(400).json(err);
            }
        );
        await User.findByIdAndUpdate(
            req.body.id,
            { $pull: { likes: req.params.id } },
            { new: true },
            (err, docs) => {
                if (!err) res.status(200).json(docs);
                else return res.status(400).json(err);
            }
        );
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// @route api/posts/comment-post/:id
// @route PATCH post
// @access private
router.patch("/comment-post/:id", async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown: " + req.params.id);

    try {
        await Post.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comments: {
                        commenterId: req.body.commenterId,
                        commenterUsername: req.body.commenterUsername,
                        text: req.body.text,
                        timestamp: new Date().getTime(),
                    },
                },
            },
            { new: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(400).send(err);
            }
        );
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// @routes api/posts/edit-comment-post/:id
// @routes PATCH posts
// @access private
router.patch("/edit-comment-post/:id", (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        return Post.findById(req.params.id, (err, docs) => {
            const theComment = docs.comments.find((comment) =>
                comment._id.equals(req.body.commentId)
            );

            if (!theComment) return res.status(404).send("Comment not found");
            theComment.text = req.body.text;

            return docs.save((err) => {
                if (!err) return res.status(200).send(docs);
                return res.status(500).send(err);
            });
        });
    } catch (err) {
        return res.status(400).send(err);
    }
});

module.exports = router;