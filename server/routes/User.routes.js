const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/User.controllers');
const uploadControllers = require('../controllers/Upload.controllers');
const multer = require('multer');
const upload = multer();

// @route api/users/
// @route GET All users
// @access Private
router.get("/", userControllers.getUser);

// @route api/users/:id
// @route GET user
// access Private
router.get("/:id", userControllers.getUserWithId);

// @route api/users/:id
// @route PUT user
// @access Private
router.put("/:id", userControllers.updateUser);

// @route api/users/:id
// @route DELETE user
// @access Private
router.delete("/:id", userControllers.deleteUser);

// @route api/users/follow/:id
// @route PATCH user
// @access private
router.patch("/follow/:id", userControllers.followUser);

// @route api/users/unfollow/:id
// @route PATH user
// @access private
router.patch("/unfollow/:id", userControllers.unfollowUser);

router.post("/upload", upload.single("file"), uploadControllers.uploadProfil);

module.exports = router;