import Generation from "../../models/generation.model.js";

export const generateComponent = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({
      message: "Prompt is required",
    });
  }

  return res.status(200).json({
    message: "AI module is ready",
    prompt,
  });
};
