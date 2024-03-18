var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  idUser: String,
  phone: String,
  address: String,
  cart: Array,
  fullname: String,
  total: String,
  status: { type: Boolean, default: false },
  delivery: { type: String, default: "chờ xác nhận" },
});

var Histories = mongoose.model("Histories", schema, "histories");

module.exports = Histories;
