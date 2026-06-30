//categoriaModel.js

const db = require("../config/database");

exports.listarTodas = async () => {
  const [rows] = await db.query("SELECT * FROM categorias");
  return rows;
};

exports.buscarPorId = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM categorias WHERE id_categoria = ?",
    [id]
  );
  return rows[0];
};

exports.criar = async (nome) => {
  const [result] = await db.query(
    "INSERT INTO categorias (nome) VALUES (?)",
    [nome]
  );
  return result.insertId;
};

exports.atualizar = async (id, nome) => {
  const [result] = await db.query(
    "UPDATE categorias SET nome = ? WHERE id_categoria = ?",
    [nome, id]
  );
  return result.affectedRows;
};

exports.deletar = async (id) => {
  const [result] = await db.query(
    "DELETE FROM categorias WHERE id_categoria = ?",
    [id]
  );
  return result.affectedRows;
};