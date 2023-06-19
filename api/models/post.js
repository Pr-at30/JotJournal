const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter your title'],
    trim: true,
  },
  summary: {
    type: String,
    required: [true, 'Please enter your summary'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Please enter your content'],
    trim: true,
  },
  cover: {
    type: String,
    required: [true, 'Please enter your cover'],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Post', postSchema);

