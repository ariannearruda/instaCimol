const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Cadastro de novo usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: arianne
 *               email:
 *                 type: string
 *                 example: arianne@email.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso
 *       400:
 *         description: Erro no cadastro
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login do usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: arianne@email.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/login", authController.login);

module.exports = router;
