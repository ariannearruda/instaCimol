const Post = require("../models/Post");

// CREATE
exports.createPost = async (req, res) => {
  try {
    const { title, description } = req.body;

    await Post.create({
      title,
      description: description || "",
      image: req.file ? req.file.filename : null,
      userId: req.user.id,
      username: req.user.username, // 🔥 agora salva o nome também
      likes: 0,
      comments: []
    });

    return res.redirect("/feed");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// LIKE
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.redirect("/feed");

    post.likes += 1;

    await post.save();

    return res.redirect("/feed");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// COMMENT
exports.commentPost = async (req, res) => {
  try {
    const { comment } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) return res.redirect("/feed");

    post.comments.push({
      user: req.user.username, // 🔥 SEM MAIS USER DO FORM
      text: comment
    });

    await post.save();

    return res.redirect("/feed");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.redirect("/feed");

    if (post.userId.toString() !== req.user.id) {
      return res.send("Acesso negado");
    }

    await Post.findByIdAndDelete(req.params.id);

    return res.redirect("/feed");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};