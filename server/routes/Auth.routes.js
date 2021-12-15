const express = require('express');
const router = express.Router();
const authController = require("../controllers/Auth.controllers");

// @route api/auth/register
// @route POST auth
// @access public
router.post("/register", authController.register);

// @router api/auth/login
// @router POST auth
// @access public
router.post("/login", authController.login);

// @route api/auth/logout
// @route GET auth
// @access private
router.get("/logout", authController.logout);

module.exports = router;