let mongoose = require("mongoose");

let orderSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "orderItem",
    required: true,
  },
});

let orderModel = new mongoose.model("order", orderSchema);
