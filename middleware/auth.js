//auth.js

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const tokenHeader = req.headers.token;
    const idUsuarioHeader = req.headers.id_usuario;

    if (!tokenHeader || !idUsuarioHeader) {
      return res.status(401).json({
        erro: "Token e id_usuario são obrigatórios"
      });
    }

    const token = tokenHeader.replace("Bearer ", "");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (String(decoded.id_usuario) !== String(idUsuarioHeader)) {
      return res.status(403).json({
        erro: "ID do usuário não corresponde ao token"
      });
    }

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ erro: "Não autorizado" });
  }
};