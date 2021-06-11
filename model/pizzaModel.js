let mongoose = require("mongoose");

let pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
});

let pizzaModel = new mongoose.model("pizza", pizzaSchema);
module.exports = pizzaModel;
