const Post = require('../models/post.models');
const User = require('../models/user.models');
const { uploadErrors } = require('../utils/errors.utils');
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

module.exports.getPost = async (req, res) => {
    Post.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log("Error to get data: " + err);
    }).sort({ createdAt: -1 });
};

module.exports.createPost = async (req, res) => {

    let fileName;

    if (req.file !== null) {
        try {
            if (
                req.file.detectedMimeType != "image/jpg" &&
                req.file.detectedMimeType != "image/png" &&
                req.file.detectedMimeType != "image/jpeg"
            )
                throw Error("invalid file");

            if (req.file.size > 500000) throw Error("max size");
        } catch (error) {
            const errors = uploadErrors(err);
            return res.status(201).json({ errors });
        }

        fileName = req.body.posterId + Date.now() + ".jpg";

        await pipeline(
            req.file.stream,
            fs.createWriteStream(
                `${__dirname}/../../client/public/uploads/posts/${fileName}`
            )
        );
    }

    const newPost = new Post({
        posterId: req.body.posterId,
        message: req.body.message,
        picture: req.file !== null ? "./uploads/posts/" + fileName : "",
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
};

module.exports.updatePost = async (req, res) => {
    if (!ObjectID.isvalid(req.params.id))
        return res.status(400).send("ID unknoun: " + req.params.id);

    const updatePost = {
        message: req.body.message,
    };

    Post.findByIdAndUpdate(
        req.params.id,
        { $set: updatePost },
        { new: true },
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Updated error: " + err);
        }
    );
};

module.exports.deletePost = async (req, res) => {
    if (!ObjectID.isvalid(req.params.id))
        return res.status(400).send("ID unknown: " + req.params.id);

    Post.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log("Deleted error: " + err);
    })
};

module.exports.likePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await Post.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { likers: req.body.id },
            },
            { new: true },
            (err, docs) => {
                if (err) return res.status(400).send(err);
            }
        );
        await User.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: { likes: req.params.id },
            },
            { new: true },
            (err, docs) => {
                if (!err) res.send(docs);
                else return res.status(400).send(err);
            }
        );
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.unlikePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await Post.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { likers: req.body.id },
            },
            { new: true },
            (err, docs) => {
                if (err) return res.status(400).send(err);
            }
        );
        await User.findByIdAndUpdate(
            req.body.id,
            {
                $pull: { likes: req.params.id },
            },
            { new: true },
            (err, docs) => {
                if (!err) res.send(docs);
                else return res.status(400).send(err);
            }
        );
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.comment = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    try {
        return Post.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comments: {
                        commenterId: req.body.commenterId,
                        commenterPseudo: req.body.commenterPseudo,
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
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.updateComment = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown: " + req.params.id);

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
};

module.exports.deleteComment = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown: " + req.params.id);
    
    try {
        return Post.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    comments: {
                        _id: req.body.commentId,
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
        return res.status(400).send(err);
    }
};