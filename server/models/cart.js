import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    unique: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity can not be less than 1"],
        default: 1,
      },
    },
  ],
});

const cart = mongoose.model("Cart", cartSchema);

export default cart;
