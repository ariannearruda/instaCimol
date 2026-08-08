//auth.js

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const tokenHeader = req.headers.token;
    const idUsuarioHeader = req.headers.id_usuario;

    const tokenCookie = req.cookies ? req.cookies.token : null;
    const idUsuarioCookie = req.cookies ? req.cookies.id_usuario : null;

    const tokenRecebido = tokenHeader || tokenCookie;
    const idUsuarioRecebido = idUsuarioHeader || idUsuarioCookie;

    if (!tokenRecebido || !idUsuarioRecebido) {
      const aceitaHtml =
        req.headers.accept &&
        req.headers.accept.includes("text/html");

      if (aceitaHtml) {
        return res.redirect("/login");
      }

      return res.status(401).json({
        erro: "Token e id_usuario são obrigatórios"
      });
    }

    const token = tokenRecebido.replace("Bearer ", "");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (String(decoded.id_usuario) !== String(idUsuarioRecebido)) {
      return res.status(403).json({
        erro: "ID do usuário não corresponde ao token"
      });
    }

    req.user = decoded;

    next();
  } catch (err) {
    const aceitaHtml =
      req.headers.accept &&
      req.headers.accept.includes("text/html");

    if (aceitaHtml) {
      return res.redirect("/login");
    }

    return res.status(401).json({
      erro: "Não autorizado"
    });
  }
};