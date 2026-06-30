<<<<<<< HEAD
//post.js

=======
>>>>>>> 8453739ba698cce02a46d1af7502f2cc16f55cf6
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
  required: false,
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
