<<<<<<< HEAD
//authRoutes.js

=======
>>>>>>> 8453739ba698cce02a46d1af7502f2cc16f55cf6
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
<<<<<<< HEAD
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: João da Silva
 *               nick:
 *                 type: string
 *                 example: joao
 *               senha:
=======
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
>>>>>>> 8453739ba698cce02a46d1af7502f2cc16f55cf6
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
<<<<<<< HEAD
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nick:
 *                 type: string
 *                 example: candido
 *               senha:
 *                 type: string
 *                 example: "123"
=======
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
>>>>>>> 8453739ba698cce02a46d1af7502f2cc16f55cf6
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/login", authController.login);

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> 8453739ba698cce02a46d1af7502f2cc16f55cf6
