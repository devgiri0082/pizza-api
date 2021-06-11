let mongoose = require("mongoose");
let express = require("express");
const {
  allOrders,
  pizzaDetail,
  pizzaWithIngredient,
  addPizza,
  addOrder,
} = require("./controller/orderController");
const app = express();
(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/pizza", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
})();
let ingredients = ["tomato", "mozzarella"];
addPizza("Margherita", 5, ingredients);
addOrder("Margherita", 10);
app.get("/orders", async (req, res) => {
  let orders = await allOrders();
  res.json(orders);
});
app.get("/orders/:id", async (req, res) => {
  console.log(req.params.id);
  let pizza = await pizzaDetail(req.params.id);
  res.json(pizza);
});

app.get("/pizzas", async (req, res) => {
  console.log(req.query.ingredients);
  let pizza = await pizzaWithIngredient(req.query.ingredients);
  res.json(pizza);
});
const PORT = 3300;
app.listen(PORT, () => {
  console.log(`listening at localhost:${PORT}`);
});
