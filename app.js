// app.js

const express = require("express");
require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* =========================
   CORS
========================= */

const allowedOrigins = [
  "http://localhost:3000",
  process.env.API_URL,
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Permite chamadas sem origin, como Swagger/Postman
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origem não permitida pelo CORS"));
    },
    credentials: true
  })
);

/* =========================
   SWAGGER
========================= */

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "InstaCimol API",
      version: "2.0.0",
      description: "Documentação da API REST do projeto InstaCimol"
    },

    servers: [
      {
        url: process.env.API_URL || "http://localhost:3000",
        description: process.env.API_URL
          ? "Servidor de produção"
          : "Servidor local"
      }
    ]
  },

  apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

/* =========================
   MIDDLEWARES
========================= */

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

app.use(cookieParser());

app.set("view engine", "ejs");

/* =========================
   SWAGGER
========================= */

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

/* =========================
   STATUS DA API
========================= */

app.get("/api/status", (req, res) => {
  res.json({
    versao: "2.0.0",
    status: "online"
  });
});

/* =========================
   MONGODB
   Parte antiga da rede social
========================= */

if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Mongo conectado");
    })
    .catch((err) => {
      console.log(
        "Erro ao conectar no Mongo:",
        err.message
      );
    });
}

/* =========================
   ROTAS DA API MYSQL
========================= */

app.use(
  "/auth",
  require("./routes/authRoutes")
);

app.use(
  "/categorias",
  require("./routes/categoriaRoutes")
);

app.use(
  "/produtos",
  require("./routes/produtoRoutes")
);

app.use(
  "/clientes",
  require("./routes/clienteRoutes")
);

app.use(
  "/pedidos",
  require("./routes/pedidoRoutes")
);

/* =========================
   ROTAS DA REDE SOCIAL
========================= */

app.use(
  "/posts",
  require("./routes/postRoutes")
);

/* =========================
   VIEWS
========================= */

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

/* =========================
   FEED
========================= */

const auth = require("./middleware/auth");

app.get("/feed", auth, async (req, res) => {
  try {
    const Post = require("./models/post");

    const posts = await Post.find().sort({
      createdAt: -1
    });

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

/* =========================
   SERVIDOR
========================= */

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});