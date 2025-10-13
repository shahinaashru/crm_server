const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please enter your name"],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Please enter email"],
    },
    phone_number: {
      type: String,
      trim: true,
      required: [true, "Please enter phone number"],
      match: /^[0-9]{10,15}$/,
      unique: true,
    },
    address: {
      type: String,
      required: [true, "Please enter address"],
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Customer", customerSchema);
