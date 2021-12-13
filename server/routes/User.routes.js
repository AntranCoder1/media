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

module.exports = router;