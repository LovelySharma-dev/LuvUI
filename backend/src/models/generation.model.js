import mongoose from "mongoose";

const generationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    prompt: {
      type: String,
      required: true,
    },

    generatedCode: {
      type: String,
      required: true,
    },

    model: {
      type: String,
      required: true,
    },
    creditsUsed: {
      type: Number,
      default: 1,
    },

    status: {
      type: String,
      enum: ["success", "failed"],
      default: "success",
    },
  },
  { timestamps: true },
);

const Generation = mongoose.model("Generation", generationSchema);

export default Generation;
