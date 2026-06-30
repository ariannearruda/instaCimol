<<<<<<< HEAD
//postRoutes.js

=======
>>>>>>> 8453739ba698cce02a46d1af7502f2cc16f55cf6
const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
const auth = require("../middleware/auth");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 8453739ba698cce02a46d1af7502f2cc16f55cf6
router.post("/create", auth, upload.single("media"), postController.createPost);

router.post("/like/:id", auth, postController.likePost);

router.post("/comment/:id", auth, postController.commentPost);

<<<<<<< HEAD
=======
=======
/**
 * @swagger
 * /posts/create:
 *   post:
 *     summary: Criar novo post com mídia
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Meu primeiro post
 *               description:
 *                 type: string
 *                 example: Descrição do post
 *               media:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Post criado com sucesso
 *       400:
 *         description: Erro ao criar post
 */
router.post("/create", auth, upload.single("media"), postController.createPost);

/**
 * @swagger
 * /posts/like/{id}:
 *   post:
 *     summary: Curtir um post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do post
 *     responses:
 *       200:
 *         description: Post curtido com sucesso
 *       404:
 *         description: Post não encontrado
 */
router.post("/like/:id", auth, postController.likePost);

/**
 * @swagger
 * /posts/comment/{id}:
 *   post:
 *     summary: Comentar em um post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do post
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 example: Muito legal!
 *     responses:
 *       200:
 *         description: Comentário realizado com sucesso
 *       404:
 *         description: Post não encontrado
 */
router.post("/comment/:id", auth, postController.commentPost);

/**
 * @swagger
 * /posts/delete/{id}:
 *   post:
 *     summary: Excluir um post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do post
 *     responses:
 *       200:
 *         description: Post excluído com sucesso
 *       403:
 *         description: Acesso negado
 *       404:
 *         description: Post não encontrado
 */
>>>>>>> e7a2026 (Adiciona documentacao Swagger)
>>>>>>> 8453739ba698cce02a46d1af7502f2cc16f55cf6
router.post("/delete/:id", auth, postController.deletePost);

module.exports = router;
