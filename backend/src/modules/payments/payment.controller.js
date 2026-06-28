import { PLANS } from "../../constants/plan.js";
import Payment from "../../models/payment.model.js";
import { razorpay } from "./payment.service.js";
import User from "../../models/user.model.js";
import crypto from "crypto";

export const createOrder = async (req, res) => {
  try {
    const { planId } = req.body;

    // validate plan
    const plan = PLANS[planId];

    if (!plan) {
      return res.status(400).json({
        success: false,
        message: "Invalid plan selected",
      });
    }

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: plan.amount * 100, //Convert ₹ to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    // Save in db
    const payment = await Payment.create({
      user: req.user._id,
      planId,
      orderId: order.id,
      amount: plan.amount,
      credits: plan.credits,
      status: "created",
    });

    return res.status(201).json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
      },
    });
  } catch (error) {
    console.error("Error in creating order: ", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing payment details",
      });
    }

    // Generate expected signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment Signature",
      });
    }

    // find payment
    const payment = await Payment.findOneAndUpdate(
      {
        orderId: razorpay_order_id,
        user: req.user._id,
        status: "created",
      },
      {
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
        status: "paid",
      },
      {
        new: true,
      },
    );

    if (!payment) {
      return res.status(400).json({
        success: false,
        message: "Payment already verified or not found",
      });
    }

    // Add credits
    await User.findByIdAndUpdate(payment.user, {
      $inc: {
        credits: payment.credits,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.error("Error in verifying ", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const paymentHistory = async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = 10;

    const payments = await Payment.find({
      user: req.user._id,
    })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .select("planId amount credits status paymentMethod paymentId createdAt");

    return res.status(200).json({
      success: true,
      payments,
    });
  } catch (error) {
    console.error("Error in paymentHistory: ", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
