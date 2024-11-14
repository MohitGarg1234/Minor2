const mongoose = require('mongoose');
const articleSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'authorModel',
    required: true
  },
  authorModel: {
    type: String,
    required: true,
    enum: ['User', 'Admin'] 
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  comments: [{
    text: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' 
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  reactions: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    type: {
      type: String,
      enum: ['like', 'dislike'],
      required: true
    }
  }],
  likes: { 
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
  }
});

const Articles = mongoose.model('Articles', articleSchema);
module.exports = Articles;
