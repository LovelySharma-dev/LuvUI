import mongoose from "mongoose";
import Component from "../../models/component.model.js";

export const getComponents = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;

    const query = {
      isPublished: true, //published components will be fetched.
    };

    if (category) {
      query.category = category;
    }

    // example
    // query = {
    //   isPublished: true,
    //   name: {
    //     $regex: "react",
    //     $options: "i", //case-insensitive "react"
    //   },
    // };

    if (search) {
      query.name = {
        $regex: search,
        $options: "i",
      };
    }

    const pageNum = Math.max(1, Number(page) || 1);
    const limitNum = Math.min(50, Math.max(1, Number(limit) || 10));

    const components = await Component.find(query)
      .select("name slug description category previewImage isPremium tags")
      .skip((page - 1) * limitNum)
      .limit(limitNum)
      .sort({ createdAt: -1 });

    const total = await Component.countDocuments(query);

    return res.status(200).json({
      success: true,
      components,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error("Error in getComponents:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

export const getComponent = async (req, res) => {
  const { slug } = req.params;
  try {
    const component = await Component.findOne({
      slug,
      isPublished: true,
    });

    if (!component) {
      return res.status(404).json({
        success: false,
        message: "Component not found",
      });
    }

    return res.status(200).json({
      success: true,
      component,
    });
  } catch (error) {
    console.error("Error in getComponent:", error);
    return res.status(500).json({
      success: false,
      message: "Intenal Server error",
    });
  }
};

export const createComponent = async (req, res) => {
  try {
    const component = await Component.create(req.body);

    return res.status(201).json({
      success: true,
      component,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    console.error("Error in Creating Component ", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateComponent = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid component ID",
    });
  }
  try {
    const component = await Component.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after", runValidators: true },
    );

    if (!component) {
      return res.status(404).json({
        success: false,
        message: "Component not found",
      });
    }

    return res.status(200).json({
      success: true,
      component,
    });
  } catch (error) {
    console.error("Error in Updating Component", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

export const deleteComponent = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Component ID",
    });
  }

  try {
    const component = await Component.findByIdAndDelete(req.params.id);

    if (!component) {
      return res.status(404).json({
        success: false,
        message: "Component not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Component deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleting Component", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};
