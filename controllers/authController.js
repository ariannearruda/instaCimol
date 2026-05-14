const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.send("Campos obrigatórios");
    }

    if (password.length < 8) {
      return res.send("Senha mínima de 8 caracteres");
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.send("Usuário já existe");
    }

    const hash = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hash
    });

    return res.redirect("/login");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send("Campos obrigatórios");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.send("Usuário não encontrado");
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.send("Senha inválida");
    }

    
    const token = jwt.sign(
      {
        id: user._id,
        username: user.name
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true
    });

    return res.redirect("/feed");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  return res.redirect("/login");
};