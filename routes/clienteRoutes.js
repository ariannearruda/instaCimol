//clienteRoutes.js

const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");
const auth = require("../middleware/auth");

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Lista todos os clientes
 *     tags: [Clientes]
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
 *         description: Lista de clientes
 */
router.get("/", auth, clienteController.listar);

/**
 * @swagger
 * /clientes/{id}:
 *   get:
 *     summary: Busca cliente por ID
 *     tags: [Clientes]
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
 *         description: Cliente encontrado
 */
router.get("/:id", auth, clienteController.buscarPorId);

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Cria um novo cliente
 *     tags: [Clientes]
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
 *                 example: Cliente Teste
 *               telefone:
 *                 type: string
 *                 example: "51999999999"
 *               status:
 *                 type: string
 *                 example: bom
 *     responses:
 *       201:
 *         description: Cliente criado
 */
router.post("/", auth, clienteController.criar);

/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     summary: Atualiza um cliente
 *     tags: [Clientes]
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
 *                 example: Cliente Teste Atualizado
 *               telefone:
 *                 type: string
 *                 example: "51988888888"
 *               status:
 *                 type: string
 *                 example: medio
 *     responses:
 *       200:
 *         description: Cliente atualizado
 */
router.put("/:id", auth, clienteController.atualizar);

/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     summary: Deleta um cliente
 *     tags: [Clientes]
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
 *         description: Cliente deletado
 */
router.delete("/:id", auth, clienteController.deletar);

module.exports = router;