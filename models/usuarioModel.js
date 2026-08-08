// usuarioModel.js

const db = require("../config/database");

exports.buscarPorNick = async (nick) => {
  const [rows] = await db.query(
    "SELECT * FROM usuarios WHERE nick = ?",
    [nick]
  );

  return rows[0];
};

exports.criar = async (usuario) => {
  const [result] = await db.query(
    "INSERT INTO usuarios (nome, nick, senha) VALUES (?, ?, ?)",
    [usuario.nome, usuario.nick, usuario.senha]
  );

  return result.insertId;
};