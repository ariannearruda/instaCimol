<<<<<<< HEAD
//db.js

=======
>>>>>>> 8453739ba698cce02a46d1af7502f2cc16f55cf6
const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Mongo conectado"))
    .catch(err => console.log(err));
};