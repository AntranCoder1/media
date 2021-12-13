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

module.exports = router;