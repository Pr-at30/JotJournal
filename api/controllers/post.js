const fs = require('fs');
const Post = require('../models/post');
const jwt = require('jsonwebtoken');

// Create post
const createPost = async (req, res) => {

  // If no file is uploaded then dummy file is uploaded
  if (!req.file) {
    req.file = {
      originalname: 'dummy.jpg',
      path: 'uploads\\dummy',
    };
  }
  const { originalname, path } = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path + '.' + ext;
  fs.renameSync(path, newPath);

  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { title, summary, content } = req.body;

    const post = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: decoded.id,
      likesCount: 0,
    });
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};

// Update post
const updatePost = async (req, res) => {

  // If no file is uploaded then dont update cover
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
  }

  const postId = req.params.id;
  const { title, summary, content } = req.body;

  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        title,
        summary,
        content,
        ...(newPath && { cover: newPath }),
      },
      { new: true }
    );
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};

// Delete post
const deletePost = async (req, res) => {
  const postId = req.params.id;
  try {
    // Also delete the cover image
    const post = await Post.findByIdAndDelete(postId);
    if (post.cover !== 'uploads\\dummy.jpg') {
      fs.unlinkSync(post.cover);
    }
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};

// Get all posts
const getPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Current page number, defaulting to 1
  const pageSize = parseInt(req.query.pageSize) || 10; // Number of posts per page, defaulting to 10

  try {
    const totalPostsCount = await Post.countDocuments();
    const totalPages = Math.ceil(totalPostsCount / pageSize);

    const posts = await Post.find()
      .populate('author', ['username'])
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.json({
      posts,
      currentPage: page,
      totalPages
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get post by id
const getPostById = async (req, res) => {
  const postId = req.params.id;
  const post = await Post.findById(postId).populate('author', [
    'username',
  ]);
  res.json(post);
};


module.exports = { createPost, getPosts, getPostById, updatePost, deletePost };
