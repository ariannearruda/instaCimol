//produtoModel.js

const db = require("../config/database");

exports.listarTodos = async () => {
  const [rows] = await db.query("SELECT * FROM produtos");
  return rows;
};

exports.buscarPorId = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM produtos WHERE id_produto = ?",
    [id]
  );

  return rows[0];
};

exports.criar = async (produto) => {
  const [result] = await db.query(
    `INSERT INTO produtos
    (nome, valor, estoque, categorias_id_categoria)
    VALUES (?, ?, ?, ?)`,
    [
      produto.nome,
      produto.valor,
      produto.estoque,
      produto.categorias_id_categoria
    ]
  );

  return result.insertId;
};

exports.atualizar = async (id, produto) => {
  const [result] = await db.query(
    `UPDATE produtos
     SET nome = ?, valor = ?, estoque = ?, categorias_id_categoria = ?
     WHERE id_produto = ?`,
    [
      produto.nome,
      produto.valor,
      produto.estoque,
      produto.categorias_id_categoria,
      id
    ]
  );

  return result.affectedRows;
};

exports.deletar = async (id) => {
  const [result] = await db.query(
    "DELETE FROM produtos WHERE id_produto = ?",
    [id]
  );

  return result.affectedRows;
};