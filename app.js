const express = require("express");
require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

const app = express();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "instaCimol API",
      version: "1.0.0",
      description: "Documentação da API da rede social instaCimol"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());

app.set("view engine", "ejs");

connectDB();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
