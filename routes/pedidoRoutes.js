//pedidoRoutes.js

const express = require("express");
const router = express.Router();
const pedidoController = require("../controllers/pedidoController");
const auth = require("../middleware/auth");

/**
 * @swagger
 * /pedidos:
 *   get:
 *     summary: Lista todos os pedidos
 *     tags: [Pedidos]
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
 *         description: Lista de pedidos
 */
router.get("/", auth, pedidoController.listar);

/**
 * @swagger
 * /pedidos/{id}:
 *   get:
 *     summary: Busca pedido por ID
 *     tags: [Pedidos]
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
 *         description: Pedido encontrado
 */
router.get("/:id", auth, pedidoController.buscarPorId);

/**
 * @swagger
 * /pedidos:
 *   post:
 *     summary: Cria um novo pedido
 *     tags: [Pedidos]
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
 *               data:
 *                 type: string
 *                 example: "2026-06-30"
 *               clientes_id_cliente:
 *                 type: integer
 *                 example: 1
 *               itens:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     produtos_id_produto:
 *                       type: integer
 *                       example: 1
 *                     quantidade:
 *                       type: number
 *                       example: 1
 *                     valor:
 *                       type: number
 *                       example: 1259
 *     responses:
 *       201:
 *         description: Pedido criado
 */
router.post("/", auth, pedidoController.criar);

/**
 * @swagger
 * /pedidos/{id}:
 *   put:
 *     summary: Atualiza um pedido
 *     tags: [Pedidos]
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
 *               data:
 *                 type: string
 *                 example: "2026-07-01"
 *               clientes_id_cliente:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Pedido atualizado
 */
router.put("/:id", auth, pedidoController.atualizar);

/**
 * @swagger
 * /pedidos/{id}:
 *   delete:
 *     summary: Deleta um pedido
 *     tags: [Pedidos]
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
 *         description: Pedido deletado
 */
router.delete("/:id", auth, pedidoController.deletar);

module.exports = router;