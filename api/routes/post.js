const express = require("express");

const { createPost, getPosts, getPostById, updatePost, deletePost } = require("../controllers/post");

const multer = require("multer");
const uploadMiddleWare = multer(
  { dest: "uploads/" },
  { limits: { fieldSize: 50 * 1024 * 1024 } }
);

const router = express.Router();

const auth = require("../middlewares/auth");

// Create post
router.post("/", auth, uploadMiddleWare.single("file"), createPost);

// Update post
router.patch("/edit/:id", auth, uploadMiddleWare.single("file"), updatePost);

// Delete post
router.delete("/delete/:id", auth, deletePost);

// Get posts
router.get("/", getPosts);

// Get post by id
router.get("/:id", getPostById);



module.exports = router;