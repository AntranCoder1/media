const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.models');
const { signUpErrors, signInErrors } = require('../utils/errors.utils');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
};

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

// @router api/auth/login
// @router POST auth
// @access public
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json("user not found");

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json("Wrong password");

        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge});
        const { password, _id, email, createdAt, updatedAt, __v, ...orthers  } = user._doc;
        res.status(200).json({ ...orthers, token })
    } catch (error) {
        const errors = signInErrors(error);
        res.status(200).json({ errors });
    }
});

// @route api/auth/logout
// @route GET auth
// @access private
router.get("/logout", (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
});

module.exports = router;