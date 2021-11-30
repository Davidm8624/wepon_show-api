const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    maxlength: 50,
    minlength: 3,
  },
  //min length of 3, max length of 50
  email: {
    type: String,
    required: [true, "must provide email"],
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
    maxlength: 50,
    minlength: 3,
    unique: true,
    lowercase: true,
  },
  //create regex to make sure it is a valid email, Must be unique (this one will likely take some research in the docs)
  password: {
    type: String,
    required: [true, "must provide password"],
    // maxlength: 12,
    minlength: 6,
  },
  cart: [
    
  ]
  //min length 6 chars
}).pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(10));
  next();
});
UserSchema.methods.comparePassword = async function (sumittedPassword) {
  const isMatch = await bcrypt.compare(sumittedPassword, this.password);
  return isMatch;
};
UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userID: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

module.exports = mongoose.model("User", UserSchema);
