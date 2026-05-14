const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
const auth = require("../middleware/auth");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/create", auth, upload.single("media"), postController.createPost);

router.post("/like/:id", auth, postController.likePost);

router.post("/comment/:id", auth, postController.commentPost);

router.post("/delete/:id", auth, postController.deletePost);

module.exports = router;