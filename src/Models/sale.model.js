const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    clientId: {
      type: Number,
      required: true,
    },
    productId: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: [true, "Please enter quantity"],
    },
    unitPrice: {
      type: Number,
      required: [true, "Please enter the unit price"],
    },
    total: {
      type: Number,
    },
    saleDate: {
      type: Date,
      default: Date.now,
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "credit card", "others"],
      required: [true, "Please enter payment method"],
    },
  },
  {
    timestamps: true,
  }
);

const Sale = mongoose.model("Sale", saleSchema);

module.exports = Sale;
