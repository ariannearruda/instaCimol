//produtoRoutes.js

const express = require("express");
const router = express.Router();
const produtoController = require("../controllers/produtoController");
const auth = require("../middleware/auth");

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produtos]
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
 *         description: Lista de produtos
 */
router.get("/", auth, produtoController.listar);

/**
 * @swagger
 * /produtos/{id}:
 *   get:
 *     summary: Busca produto por ID
 *     tags: [Produtos]
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
 *         description: Produto encontrado
 */
router.get("/:id", auth, produtoController.buscarPorId);

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produtos]
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
 *                 example: Mouse Gamer
 *               valor:
 *                 type: number
 *                 example: 99.9
 *               estoque:
 *                 type: integer
 *                 example: 10
 *               categorias_id_categoria:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       201:
 *         description: Produto criado
 */
router.post("/", auth, produtoController.criar);

/**
 * @swagger
 * /produtos/{id}:
 *   put:
 *     summary: Atualiza um produto
 *     tags: [Produtos]
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
 *                 example: Mouse Gamer RGB
 *               valor:
 *                 type: number
 *                 example: 129.9
 *               estoque:
 *                 type: integer
 *                 example: 15
 *               categorias_id_categoria:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Produto atualizado
 */
router.put("/:id", auth, produtoController.atualizar);

/**
 * @swagger
 * /produtos/{id}:
 *   delete:
 *     summary: Deleta um produto
 *     tags: [Produtos]
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
 *         description: Produto deletado
 */
router.delete("/:id", auth, produtoController.deletar);

module.exports = router;