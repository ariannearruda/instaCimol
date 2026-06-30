//clienteModel.js

const db = require("../config/database");

exports.listarTodos = async () => {
  const [rows] = await db.query("SELECT * FROM clientes");
  return rows;
};

exports.buscarPorId = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM clientes WHERE id_cliente = ?",
    [id]
  );
  return rows[0];
};

exports.criar = async (cliente) => {
  const [result] = await db.query(
    "INSERT INTO clientes (nome, telefone, status) VALUES (?, ?, ?)",
    [cliente.nome, cliente.telefone, cliente.status]
  );
  return result.insertId;
};

exports.atualizar = async (id, cliente) => {
  const [result] = await db.query(
    "UPDATE clientes SET nome = ?, telefone = ?, status = ? WHERE id_cliente = ?",
    [cliente.nome, cliente.telefone, cliente.status, id]
  );
  return result.affectedRows;
};

exports.deletar = async (id) => {
  const [result] = await db.query(
    "DELETE FROM clientes WHERE id_cliente = ?",
    [id]
  );
  return result.affectedRows;
};