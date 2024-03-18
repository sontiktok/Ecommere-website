var mongoose = require("mongoose");
var validator = require("validator");

var schema = new mongoose.Schema({
  fullname: String,
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    validate: [validator.isEmail, "email invalid format"],
  },
  password: String,
  phone: String,
});

var Users = mongoose.model("Users", schema, "users");

module.exports = Users;
