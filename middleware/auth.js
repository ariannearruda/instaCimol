<<<<<<< HEAD
//auth.js

=======
>>>>>>> 8453739ba698cce02a46d1af7502f2cc16f55cf6
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
<<<<<<< HEAD
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
=======
    const token = req.cookies.token;

    if (!token) return res.redirect("/login");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
      username: decoded.username
    };

    next();
  } catch (err) {
    return res.redirect("/login");
>>>>>>> 8453739ba698cce02a46d1af7502f2cc16f55cf6
  }
};