//produtoController.js

const Produto = require("../models/produtoModel");

exports.listar = async (req, res) => {
  try {
    const produtos = await Produto.listarTodos();
    return res.json(produtos);
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
};

exports.buscarPorId = async (req, res) => {
  try {
    const produto = await Produto.buscarPorId(req.params.id);

    if (!produto) {
      return res.status(404).json({ erro: "Produto não encontrado" });
    }

    return res.json(produto);
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
};

exports.criar = async (req, res) => {
  try {
    const { nome, valor, estoque, categorias_id_categoria } = req.body;

    if (!nome || !valor || !estoque || !categorias_id_categoria) {
      return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
    }

    const id = await Produto.criar({
      nome,
      valor,
      estoque,
      categorias_id_categoria
    });

    return res.status(201).json({
      mensagem: "Produto criado com sucesso",
      id_produto: id
    });
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const { nome, valor, estoque, categorias_id_categoria } = req.body;

    if (!nome || !valor || !estoque || !categorias_id_categoria) {
      return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
    }

    const linhasAfetadas = await Produto.atualizar(req.params.id, {
      nome,
      valor,
      estoque,
      categorias_id_categoria
    });

    if (linhasAfetadas === 0) {
      return res.status(404).json({ erro: "Produto não encontrado" });
    }

    return res.json({ mensagem: "Produto atualizado com sucesso" });
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
};

exports.deletar = async (req, res) => {
  try {
    const linhasAfetadas = await Produto.deletar(req.params.id);

    if (linhasAfetadas === 0) {
      return res.status(404).json({ erro: "Produto não encontrado" });
    }

    return res.json({ mensagem: "Produto deletado com sucesso" });
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
};