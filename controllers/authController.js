<<<<<<< HEAD
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
=======
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.send("Campos obrigatórios");
    }

    if (password.length < 8) {
      return res.send("Senha mínima de 8 caracteres");
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.send("Usuário já existe");
    }

    const hash = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hash
    });

    return res.redirect("/login");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send("Campos obrigatórios");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.send("Usuário não encontrado");
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.send("Senha inválida");
    }

    
    const token = jwt.sign(
      {
        id: user._id,
        username: user.name
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true
    });

    return res.redirect("/feed");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  return res.redirect("/login");
>>>>>>> 8453739ba698cce02a46d1af7502f2cc16f55cf6
};