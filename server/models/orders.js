import mongooose, { mongo } from "mongoose";

const orderSchema = new mongooose.Schema(
  {
    userId: {
      type: mongooose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    orderItems: [
      {
        productId: {
          type: mongooose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          min: 1,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
      },
    ],
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      country: { type: String, required: true, default: "India" },
      phone: { type: String, required: true },
    },
    paymentInfo: {
      id: {
        type: String,
      },
      status: {
        type: String,
        required: true,
        default: "Pending",
      },
      method: {
        type: String,
        required: true,
      },
      paidAt: { type: Date },
    },
    totalPrice: { type: Number, required: true, default: 0.0 },
    orderStatus: {
      type: String,
      required: true,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing",
    },
    deliveredAt: { type: Date },
  },
  { timestamps: true },
);
const Orders = mongooose.model('Orders',orderSchema)
export default Orders
