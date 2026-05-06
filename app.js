const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());

app.set("view engine", "ejs");

connectDB();

app.use("/auth", require("./routes/authRoutes"));
app.use("/posts", require("./routes/postRoutes"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

const auth = require("./middleware/auth");

app.get("/feed", auth, async (req, res) => {
  const Post = require("./models/Post");
  const posts = await Post.find().sort({ createdAt: -1 });

  res.render("feed", {
    posts,
    user: req.user
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT);