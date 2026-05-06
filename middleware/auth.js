const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
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
  }
};