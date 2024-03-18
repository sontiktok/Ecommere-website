var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  name: String,
  price: String,
  img1: String,
  quantity: Number,
  category: String,
  description: String,
});

var Products = mongoose.model("Products", schema, "products");

module.exports = Products;
