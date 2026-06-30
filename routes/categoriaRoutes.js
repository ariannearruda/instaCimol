//categoriaRoutes.js

const express = require("express");
const router = express.Router();
const categoriaController = require("../controllers/categoriaController");
const auth = require("../middleware/auth");

/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Lista todas as categorias
 *     tags: [Categorias]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         example: Bearer seu_token_aqui
 *       - in: header
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Lista de categorias
 *       401:
 *         description: Não autorizado
 */
router.get("/", auth, categoriaController.listar);

/**
 * @swagger
 * /categorias/{id}:
 *   get:
 *     summary: Busca categoria por ID
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         example: Bearer seu_token_aqui
 *       - in: header
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Categoria encontrada
 *       404:
 *         description: Categoria não encontrada
 */
router.get("/:id", auth, categoriaController.buscarPorId);

/**
 * @swagger
 * /categorias:
 *   post:
 *     summary: Cria uma nova categoria
 *     tags: [Categorias]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         example: Bearer seu_token_aqui
 *       - in: header
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Games
 *     responses:
 *       201:
 *         description: Categoria criada
 */
router.post("/", auth, categoriaController.criar);

/**
 * @swagger
 * /categorias/{id}:
 *   put:
 *     summary: Atualiza uma categoria
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         example: Bearer seu_token_aqui
 *       - in: header
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Games e Consoles
 *     responses:
 *       200:
 *         description: Categoria atualizada
 */
router.put("/:id", auth, categoriaController.atualizar);

/**
 * @swagger
 * /categorias/{id}:
 *   delete:
 *     summary: Deleta uma categoria
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         example: Bearer seu_token_aqui
 *       - in: header
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Categoria deletada
 */
router.delete("/:id", auth, categoriaController.deletar);

module.exports = router;