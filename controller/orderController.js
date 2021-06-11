let order = require("../model/orderModel");
let orderItem = require("../model/orderItemModel");
let pizza = require("../model/pizzaModel");
let addPizza = async (name, price, ingredients) => {
  try {
    let newPizza = new pizza({ name: name, price: price, ingredients });
    await newPizza.save();
  } catch (err) {
    console.log(err);
  }
};
let addOrder = async (pizzaName, quantity) => {
  try {
    let givenPizza = await pizza.findOne({ name: pizzaName });
    console.log(givenPizza);
    let newOrderItem = new orderItem({
      pizza: givenPizza["_id"],
      quantity: quantity,
    });
    await newOrderItem.save();
    let newOrder = new order({ order: newOrderItem["_id"] });
    await newOrder.save();
    console.log("done");
  } catch (err) {
    console.log(err);
  }
};
let allOrders = async () => {
  try {
    let presentOrder = await orderItem.find().populate("pizza");
    if (presentOrder.length === 0) {
      console.log("There are no order");
      return [];
    }
    console.log("orders: ");
    presentOrder.forEach((elem, index) =>
      console.log(
        `${index}. ${elem.pizza.name}, cost: ${elem.pizza.price}, quantity: ${elem.quantity}`
      )
    );

    return presentOrder;
  } catch (err) {
    console.log(err);
  }
};

let pizzaDetail = async (name) => {
  let eachPizza = await pizza.findOne({ name: name });
  let allPizza1 = await pizza.find();
  console.log(allPizza1);
  console.log(eachPizza);
  if (!eachPizza) {
    console.log("There is no pizza with given name");
    return {};
  }
  console.log(
    `${eachPizza.name}, price: ${
      eachPizza.price
    }, ingredients: ${eachPizza.ingredients.join(", ")}`
  );
  return eachPizza;
};

let pizzaWithIngredient = async (ingredient) => {
  let allPizza = await pizza.find();
  let selectedPizza = allPizza.map((elem) =>
    elem.ingredients.include(ingredient)
  );
  if (selectedPizza.length === 0) {
    console.log("there are no pizza with given ingredients");
    return;
  }
  console.log(`pizzas with ingredients as ${ingredient}`);
  selectedPizza.forEach((elem, index) => console.log(`${index}. ${elem.name}`));
};

module.exports = {
  allOrders,
  pizzaDetail,
  pizzaWithIngredient,
  addPizza,
  addOrder,
};
