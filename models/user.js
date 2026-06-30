<<<<<<< HEAD
//user.js

=======
>>>>>>> 8453739ba698cce02a46d1af7502f2cc16f55cf6
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

module.exports = mongoose.model("User", userSchema);