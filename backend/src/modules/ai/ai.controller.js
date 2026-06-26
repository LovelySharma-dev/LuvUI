import Generation from "../../models/generation.model.js";
import { generateWithAI } from "./ai.service.js";
import User from "../../models/user.model.js";
export const generateComponent = async (req, res) => {
  const { prompt } = req.body;

  try {
    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        message: "Prompt is required",
      });
    }

    // check credits
    if (req.user.credits <= 0) {
      return res.status(403).json({
        message: "Insufficent credits",
      });
    }

    // Generate component
    const generatedCode = await generateWithAI(prompt);

    // 1. Save Generation

    await Generation.create({
      user: req.user._id,
      prompt,
      generatedCode,
      model: process.env.OPENROUTER_MODEL,
    });

    // 2. Deduct Credits
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $inc: { credits: -1 },
      },
      {
        new: true,
      },
    );

    return res.status(200).json({
      success: true,
      generatedCode,
      creditsRemaining: updatedUser.credits,
    });
  } catch (error) {
    console.error("Error in generateComponent:", error);
  }
};
