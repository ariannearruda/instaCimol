const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
const auth = require("../middleware/auth");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// posts
router.post("/create", auth, upload.single("image"), postController.createPost);

// like
router.post("/like/:id", auth, postController.likePost);

// comment
router.post("/comment/:id", auth, postController.commentPost);

// delete
router.post("/delete/:id", auth, postController.deletePost);

module.exports = router;