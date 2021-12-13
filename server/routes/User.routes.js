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

// @routes api/users/:id
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

module.exports = router;