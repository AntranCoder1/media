const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.models');
const { signUpErrors } = require('../utils/errors.utils');

// @route api/auth/register
// @route POST auth
// @access public
router.post("/register", async (req, res) => {
    try {
        // generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // create a new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        // save user and respond
        const user = await newUser.save();
        res.status(200).json({ user: user._id });
    } catch (error) {
        const errors = signUpErrors(error);
        res.status(200).json({ errors });
    }
}); 

module.exports = router;