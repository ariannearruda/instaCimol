const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: String,
  text: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    default: ""
  },

  image: {
    type: String,
    default: null
  },

  media: {
    type: String,
    default: null
  },

  mediaType: {
    type: String,
    default: null
  },

  userId: String,

  username: String,

  likes: {
    type: Number,
    default: 0
  },

  comments: [commentSchema],

  createdAt: {
    type: Date,
    default: Date.now
  } 
}); 

module.exports = mongoose.model("Post", postSchema);