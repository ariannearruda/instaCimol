//authController.js

const Usuario = require("../models/usuarioModel");
const jwt = require("jsonwebtoken");
const md5 = require("md5");

exports.login = async (req, res) => {
  try {
    const { nick, senha } = req.body;

    if (!nick || !senha) {
      return res.status(400).json({
        erro: "Nick e senha são obrigatórios"
      });
    }

    const usuario = await Usuario.buscarPorNick(nick);

    if (!usuario) {
      return res.status(401).json({
        erro: "Usuário não encontrado"
      });
    }

    // Aceita tanto senha em texto quanto hash MD5
    if (senha !== usuario.senha && md5(senha) !== usuario.senha) {
      return res.status(401).json({
        erro: "Senha inválida"
      });
    }

    const token = jwt.sign(
      {
        id_usuario: usuario.id_usuario,
        nick: usuario.nick
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    return res.status(200).json({
      mensagem: "Login realizado com sucesso",
      token,
      usuario: {
        id_usuario: usuario.id_usuario,
        nome: usuario.nome,
        nick: usuario.nick
      }
    });

  } catch (err) {
    return res.status(500).json({
      erro: err.message
    });
  }
};

exports.register = async (req, res) => {
  return res.status(501).json({
    erro: "Cadastro não implementado nesta versão"
  });
};

exports.logout = (req, res) => {
  return res.status(200).json({
    mensagem: "Logout realizado"
  });
};