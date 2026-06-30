//clienteController.js

const Cliente = require("../models/clienteModel");

exports.listar = async (req, res) => {
  try {
    const clientes = await Cliente.listarTodos();
    return res.json(clientes);
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
};

exports.buscarPorId = async (req, res) => {
  try {
    const cliente = await Cliente.buscarPorId(req.params.id);

    if (!cliente) {
      return res.status(404).json({ erro: "Cliente não encontrado" });
    }

    return res.json(cliente);
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
};

exports.criar = async (req, res) => {
  try {
    const { nome, telefone, status } = req.body;

    if (!nome || !telefone) {
      return res.status(400).json({ erro: "Nome e telefone são obrigatórios" });
    }

    const id = await Cliente.criar({
      nome,
      telefone,
      status: status || "medio"
    });

    return res.status(201).json({
      mensagem: "Cliente criado com sucesso",
      id_cliente: id
    });
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const { nome, telefone, status } = req.body;

    if (!nome || !telefone) {
      return res.status(400).json({ erro: "Nome e telefone são obrigatórios" });
    }

    const linhasAfetadas = await Cliente.atualizar(req.params.id, {
      nome,
      telefone,
      status: status || "medio"
    });

    if (linhasAfetadas === 0) {
      return res.status(404).json({ erro: "Cliente não encontrado" });
    }

    return res.json({ mensagem: "Cliente atualizado com sucesso" });
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
};

exports.deletar = async (req, res) => {
  try {
    const linhasAfetadas = await Cliente.deletar(req.params.id);

    if (linhasAfetadas === 0) {
      return res.status(404).json({ erro: "Cliente não encontrado" });
    }

    return res.json({ mensagem: "Cliente deletado com sucesso" });
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
};