const express = require('express');
const router = express.Router();
const postController = require('../controllers/Post.controllers');
const uploadController = require('../controllers/Upload.controllers');
const multer = require('multer');
const upload = multer();

// @routes api/posts/
// @routes GET posts
// @access Private
router.get("/", postController.getPost);

// @routes api/posts/
// @routes POST post
// @access Private
router.post("/", upload.single("file"), postController.createPost);

// @routes api/posts/:id
// @routes PUT post
// @access private
router.put("/:id", postController.updatePost);

// @routes api/posts/:id
// @routes DELETE post
// @access private
router.delete("/:id", postController.deletePost);

// @routes api/posts/like-post/:id
// @routes PATCH post
// @access private
router.patch("/like-post/:id", postController.likePost);

// @routes api/posts/unlike-post/:id
// @routes PATCH post
// @access private
router.patch("/unlike-post/:id", postController.unlikePost);

// @route api/posts/comment-post/:id
// @route PATCH create post comment
// @access private
router.patch("/comment-post/:id", postController.comment);

// @routes api/posts/edit-comment-post/:id
// @routes PATCH update posts comment
// @access private
router.patch("/edit-comment-post/:id", postController.updateComment);

// @routes api/posts/delete-comment-post/:id
// @routes PATCH delete post comment
// @access private
router.patch("/delete-comment-post/:id", postController.deleteComment);

router.post("/upload", upload.single("file"), uploadController.uploadProfil);

module.exports = router;