let mongoose = require("mongoose");

let orderItemSchema = new mongoose.Schema({
  pizza: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "pizza",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

let orderItemModel = new mongoose.model("orderItem", orderItemSchema);

module.exports = orderItemModel;
