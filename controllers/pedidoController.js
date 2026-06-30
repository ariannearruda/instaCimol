//pedidoController.js

const Pedido = require("../models/pedidoModel");

exports.listar = async (req, res) => {
  try {
    const pedidos = await Pedido.listarTodos();
    return res.json(pedidos);
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
};

exports.buscarPorId = async (req, res) => {
  try {
    const pedido = await Pedido.buscarPorId(req.params.id);

    if (!pedido) {
      return res.status(404).json({ erro: "Pedido não encontrado" });
    }

    return res.json(pedido);
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
};

exports.criar = async (req, res) => {
  try {
    const { data, clientes_id_cliente, itens } = req.body;

    if (!data || !clientes_id_cliente || !itens || itens.length === 0) {
      return res.status(400).json({
        erro: "Data, cliente e itens são obrigatórios"
      });
    }

    const id = await Pedido.criar({
      data,
      clientes_id_cliente,
      itens
    });

    return res.status(201).json({
      mensagem: "Pedido criado com sucesso",
      id_pedido: id
    });
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const { data, clientes_id_cliente } = req.body;

    if (!data || !clientes_id_cliente) {
      return res.status(400).json({
        erro: "Data e cliente são obrigatórios"
      });
    }

    const linhasAfetadas = await Pedido.atualizar(req.params.id, {
      data,
      clientes_id_cliente
    });

    if (linhasAfetadas === 0) {
      return res.status(404).json({ erro: "Pedido não encontrado" });
    }

    return res.json({ mensagem: "Pedido atualizado com sucesso" });
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
};

exports.deletar = async (req, res) => {
  try {
    const linhasAfetadas = await Pedido.deletar(req.params.id);

    if (linhasAfetadas === 0) {
      return res.status(404).json({ erro: "Pedido não encontrado" });
    }

    return res.json({ mensagem: "Pedido deletado com sucesso" });
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
};