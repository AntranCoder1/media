const express = require('express');
const router = express.Router();
const User = require('../models/user.models');
const ObjectID = require('mongoose').Types.ObjectId;

// @route api/users/
// @route GET All users
// @access Private
router.get("/", async (req, res) => {
    const users = await User.find().select("-password");
    res.status(200).json(users);
});

// @route api/users/:id
// @route GET user
// access Private
router.get("/:id", async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    User.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log("ID unknown : " + err);
    }).select("-password");
});

// @route api/users/:id
// @route PUT user
// @access Private
router.put("/:id", async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown: " + req.params.id);

    try {
        await User.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: req.body,
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                if (err) return res.status(500).send({ message: err });
            }
        );
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// @route api/users/:id
// @route DELETE user
// @access Private
router.delete("/:id", async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown: " + req.params.id);

    try {
        await User.remove({ _id: req.params.id }).exec();
        res.status(200).json({ success: true, message: "Successfully deleted." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// @route api/users/follow/:id
// @route PATCH user
// @access private
router.patch("/follow/:id", async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToFollow))
        return res.status(400).send("ID unknown: " + req.params.id);

    try {
        // add to the follower list
        await User.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { following: req.body.idToFollow } },
            { new: true, upsert: true },
            (err, docs) => {
                if (!err) res.status(201).json(docs);
                else return res.status(400).json(err);
            }
        );

        // add to following list
        await User.findByIdAndUpdate(
            req.body.idToFollow,
            { $addToSet: { followers: req.params.id } },
            { new: true, upsert: true },
            (err, docs) => {
                // if (!err) res.status(201).json(docs);
                if (err) return res.status(400).json(err);
            }
        );
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// @route api/users/unfollow/:id
// @route PATH user
// @access private
router.patch("/unfollow/:id", async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToUnfollow))
        return res.status(400).send("ID unknown: " + req.params.id);
    
    try {
        await User.findByIdAndUpdate(
            req.params.id,
            { $pull: { following: req.body.idToUnfollow } },
            { new: true, upsert: true },
            (err, docs) => {
                if (!err) res.status(201).json(docs);
                else return res.status(400).jsos(err);
            }
        );
        // remove to following list
        await User.findByIdAndUpdate(
            req.body.idToUnfollow,
            { $pull: { followers: req.params.id } },
            { new: true, upsert: true },
            (err, docs) => {
                // if (!err) res.status(201).json(docs);
                if (err) return res.status(400).jsos(err);
            }
        );
    } catch (err) {
        return res.status(500).json({ message: err });
    }
});

module.exports = router;