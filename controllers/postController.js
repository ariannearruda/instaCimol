//postController.js

const Post = require("../models/post");

exports.createPost = async (req, res) => {
  try {
    const { title, description } = req.body;

    await Post.create({
      title,
      description: description || "",
      media: req.file ? req.file.filename : null,
      mediaType: req.file ? req.file.mimetype : null,
      userId: String(req.user.id_usuario),
      username: req.user.nick,
      likes: 0,
      comments: []
    });

    return res.redirect("/feed");
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.redirect("/feed");
    }

    post.likes += 1;

    await post.save();

    return res.redirect("/feed");
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};

exports.commentPost = async (req, res) => {
  try {
    const { comment } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.redirect("/feed");
    }

    post.comments.push({
      user: req.user.nick,
      text: comment
    });

    await post.save();

    return res.redirect("/feed");
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.redirect("/feed");
    }

    if (String(post.userId) !== String(req.user.id_usuario)) {
      return res.status(403).send("Acesso negado");
    }

    await Post.findByIdAndDelete(req.params.id);

    return res.redirect("/feed");
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};