const mongoose = require("mongoose");
const uniqueValidatior=require('mongoose-unique-validator')
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidatior)
module.exports = mongoose.model("User", userSchema);
