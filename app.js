<<<<<<< HEAD
//app.js

=======
>>>>>>> 8453739ba698cce02a46d1af7502f2cc16f55cf6
const express = require("express");
require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

<<<<<<< HEAD
=======
const connectDB = require("./config/db");
>>>>>>> 8453739ba698cce02a46d1af7502f2cc16f55cf6
const cookieParser = require("cookie-parser");

const app = express();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
<<<<<<< HEAD
      title: "loja API",
      version: "2.0.0",
      description: "Documentação da API da loja"
=======
      title: "instaCimol API",
      version: "1.0.0",
      description: "Documentação da API da rede social instaCimol"
>>>>>>> 8453739ba698cce02a46d1af7502f2cc16f55cf6
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

<<<<<<< HEAD
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/api/status", (req, res) => {
  res.json({
    versao: "2.0.0",
    status: "online"
  });
});

app.use("/auth", require("./routes/authRoutes"));
app.use("/categorias", require("./routes/categoriaRoutes"));
app.use("/produtos", require("./routes/produtoRoutes"));
app.use("/clientes", require("./routes/clienteRoutes"));
app.use("/pedidos", require("./routes/pedidoRoutes"));
// app.use("/posts", require("./routes/postRoutes"));
=======
connectDB();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/auth", require("./routes/authRoutes"));
app.use("/posts", require("./routes/postRoutes"));

>>>>>>> 8453739ba698cce02a46d1af7502f2cc16f55cf6
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

<<<<<<< HEAD
/*
=======
>>>>>>> 8453739ba698cce02a46d1af7502f2cc16f55cf6
const auth = require("./middleware/auth");

app.get("/feed", auth, async (req, res) => {
  const Post = require("./models/Post");
  const posts = await Post.find().sort({ createdAt: -1 });

  res.render("feed", {
    posts,
    user: req.user
  });
});
<<<<<<< HEAD
*/
=======
>>>>>>> 8453739ba698cce02a46d1af7502f2cc16f55cf6

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
<<<<<<< HEAD
});
=======
});
>>>>>>> 8453739ba698cce02a46d1af7502f2cc16f55cf6
