//pedidoModel.js

const db = require("../config/database");

exports.listarTodos = async () => {
  const [rows] = await db.query(`
    SELECT 
      p.id_pedido,
      p.data,
      p.clientes_id_cliente,
      c.nome AS nome_cliente
    FROM pedidos p
    INNER JOIN clientes c ON p.clientes_id_cliente = c.id_cliente
  `);

  return rows;
};

exports.buscarPorId = async (id) => {
  const [pedido] = await db.query(
    `SELECT 
      p.id_pedido,
      p.data,
      p.clientes_id_cliente,
      c.nome AS nome_cliente
    FROM pedidos p
    INNER JOIN clientes c ON p.clientes_id_cliente = c.id_cliente
    WHERE p.id_pedido = ?`,
    [id]
  );

  const [itens] = await db.query(
    `SELECT 
      pp.produtos_id_produto,
      pr.nome AS nome_produto,
      pp.quantidade,
      pp.valor
    FROM produtos_pedidos pp
    INNER JOIN produtos pr ON pp.produtos_id_produto = pr.id_produto
    WHERE pp.pedidos_id_pedido = ?`,
    [id]
  );

  if (!pedido[0]) return null;

  return {
    ...pedido[0],
    itens
  };
};

exports.criar = async (pedido) => {
  const conexao = await db.getConnection();

  try {
    await conexao.beginTransaction();

    const [resultPedido] = await conexao.query(
      "INSERT INTO pedidos (data, clientes_id_cliente) VALUES (?, ?)",
      [pedido.data, pedido.clientes_id_cliente]
    );

    const idPedido = resultPedido.insertId;

    for (const item of pedido.itens) {
      await conexao.query(
        `INSERT INTO produtos_pedidos
        (produtos_id_produto, pedidos_id_pedido, quantidade, valor)
        VALUES (?, ?, ?, ?)`,
        [
          item.produtos_id_produto,
          idPedido,
          item.quantidade,
          item.valor
        ]
      );
    }

    await conexao.commit();

    return idPedido;
  } catch (err) {
    await conexao.rollback();
    throw err;
  } finally {
    conexao.release();
  }
};

exports.atualizar = async (id, pedido) => {
  const [result] = await db.query(
    "UPDATE pedidos SET data = ?, clientes_id_cliente = ? WHERE id_pedido = ?",
    [pedido.data, pedido.clientes_id_cliente, id]
  );

  return result.affectedRows;
};

exports.deletar = async (id) => {
  const conexao = await db.getConnection();

  try {
    await conexao.beginTransaction();

    await conexao.query(
      "DELETE FROM produtos_pedidos WHERE pedidos_id_pedido = ?",
      [id]
    );

    const [result] = await conexao.query(
      "DELETE FROM pedidos WHERE id_pedido = ?",
      [id]
    );

    await conexao.commit();

    return result.affectedRows;
  } catch (err) {
    await conexao.rollback();
    throw err;
  } finally {
    conexao.release();
  }
};