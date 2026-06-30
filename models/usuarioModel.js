const db = require("../config/database");

exports.buscarPorNick = async (nick) => {
  const [rows] = await db.query(
    "SELECT * FROM usuarios WHERE nick = ?",
    [nick]
  );

  return rows[0];
};