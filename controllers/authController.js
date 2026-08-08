//authController.js

const Usuario = require("../models/usuarioModel");
const jwt = require("jsonwebtoken");
const md5 = require("md5");

exports.register = async (req, res) => {
  try {
    const { nome, nick, senha } = req.body;

    const veioDoFormulario = req.is("application/x-www-form-urlencoded");

    if (!nome || !nick || !senha) {
      if (veioDoFormulario) {
        return res
          .status(400)
          .send("Nome, nick e senha são obrigatórios.");
      }

      return res.status(400).json({
        erro: "Nome, nick e senha são obrigatórios"
      });
    }

    const existe = await Usuario.buscarPorNick(nick);

    if (existe) {
      if (veioDoFormulario) {
        return res
          .status(400)
          .send("Esse nick já está cadastrado.");
      }

      return res.status(400).json({
        erro: "Nick já cadastrado"
      });
    }

    const id = await Usuario.criar({
      nome,
      nick,
      senha: md5(senha)
    });

    // SITE
    if (veioDoFormulario) {
      return res.redirect("/login");
    }

    // SWAGGER / API
    return res.status(201).json({
      mensagem: "Usuário cadastrado com sucesso",
      id_usuario: id
    });

  } catch (err) {
    return res.status(500).json({
      erro: err.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { nick, senha } = req.body;

    const veioDoFormulario = req.is("application/x-www-form-urlencoded");

    if (!nick || !senha) {
      if (veioDoFormulario) {
        return res
          .status(400)
          .send("Nick e senha são obrigatórios.");
      }

      return res.status(400).json({
        erro: "Nick e senha são obrigatórios"
      });
    }

    const usuario = await Usuario.buscarPorNick(nick);

    if (!usuario) {
      if (veioDoFormulario) {
        return res
          .status(401)
          .send("Usuário não encontrado.");
      }

      return res.status(401).json({
        erro: "Usuário não encontrado"
      });
    }

    if (senha !== usuario.senha && md5(senha) !== usuario.senha) {
      if (veioDoFormulario) {
        return res
          .status(401)
          .send("Senha inválida.");
      }

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

    // SITE
    if (veioDoFormulario) {
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
      });

      res.cookie("id_usuario", usuario.id_usuario, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
      });

      return res.redirect("/feed");
    }

    // SWAGGER / API
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

exports.logout = (req, res) => {
  const veioDoNavegador =
    req.headers.accept &&
    req.headers.accept.includes("text/html");

  res.clearCookie("token");
  res.clearCookie("id_usuario");

  if (veioDoNavegador) {
    return res.redirect("/login");
  }

  return res.status(200).json({
    mensagem: "Logout realizado"
  });
};