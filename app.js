//app.js

const express = require("express");
require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const app = express();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "loja API",
      version: "2.0.0",
      description: "Documentação da API da loja"
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

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/api/status", (req, res) => {
  res.json({
    versao: "2.0.0",
    status: "online"
  });
});

// Conexão MongoDB usada pela parte antiga da rede social
if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Mongo conectado");
    })
    .catch((err) => {
      console.log("Erro ao conectar no Mongo:", err.message);
    });
}

// Rotas da API MySQL
app.use("/auth", require("./routes/authRoutes"));
app.use("/categorias", require("./routes/categoriaRoutes"));
app.use("/produtos", require("./routes/produtoRoutes"));
app.use("/clientes", require("./routes/clienteRoutes"));
app.use("/pedidos", require("./routes/pedidoRoutes"));

// Rotas da rede social
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
  try {
    const Post = require("./models/post");

    const posts = await Post.find().sort({ createdAt: -1 });

    return res.render("feed", {
      posts,
      user: req.user
    });
  } catch (err) {
    return res.status(500).json({
      erro: err.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});