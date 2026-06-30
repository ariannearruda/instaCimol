//categoriaController.js

const Categoria = require("../models/categoriaModel");

exports.listar = async (req, res) => {
  try {
    const categorias = await Categoria.listarTodas();
    return res.json(categorias);
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
};

exports.buscarPorId = async (req, res) => {
  try {
    const categoria = await Categoria.buscarPorId(req.params.id);

    if (!categoria) {
      return res.status(404).json({ erro: "Categoria não encontrada" });
    }

    return res.json(categoria);
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
};

exports.criar = async (req, res) => {
  try {
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ erro: "Nome é obrigatório" });
    }

    const id = await Categoria.criar(nome);

    return res.status(201).json({
      mensagem: "Categoria criada com sucesso",
      id_categoria: id
    });
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ erro: "Nome é obrigatório" });
    }

    const linhasAfetadas = await Categoria.atualizar(req.params.id, nome);

    if (linhasAfetadas === 0) {
      return res.status(404).json({ erro: "Categoria não encontrada" });
    }

    return res.json({ mensagem: "Categoria atualizada com sucesso" });
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
};

exports.deletar = async (req, res) => {
  try {
    const linhasAfetadas = await Categoria.deletar(req.params.id);

    if (linhasAfetadas === 0) {
      return res.status(404).json({ erro: "Categoria não encontrada" });
    }

    return res.json({ mensagem: "Categoria deletada com sucesso" });
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
};