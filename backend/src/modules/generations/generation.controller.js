import Generation from "../../models/generation.model.js";
import mongoose from "mongoose";
export const getGenerations = async (req, res) => {
  try {
    const generations = await Generation.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: generations.length,
      generations,
    });
  } catch (error) {
    console.error("Error in getGenerations", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};
export const getGenerationById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid generation ID",
    });
  }
  try {
    const generation = await Generation.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!generation) {
      return res
        .status(404)
        .json({ success: false, message: "Generation not found" });
    }

    return res.status(200).json({
      success: true,
      generation,
    });
  } catch (error) {
    console.error("Error in getGenerationById:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
// !todo
export const deleteGeneration = async (req, res) => {};
