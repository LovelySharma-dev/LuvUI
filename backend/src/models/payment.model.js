import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    planId: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    paymentId: {
      type: String,
      default: null,
    },
    signature: {
      type: String,
      default: null,
    },
    amount: {
      type: Number,
      required: true,
    },
    credits: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["created", "paid", "failed"],
      default: "created",
    },
    paymentMethod: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
