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

    const components = await Component.find(query)
      .select("name slug description category previewImage isPremium tags")
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Component.countDocuments(query);

    const pageNum = Number(page);
    const limitNum = Number(limit);
    return res.status(200).json({
      components,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limit),
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
        message: "Component not found",
      });
    }

    return res.status(200).json(component);
  } catch (error) {
    console.error("Error in getComponent:", error);
  }
  return res.status(500).json({
    success: false,
    message: "Intenal Server error",
  });
};

export const createComponent = async (req, res) => {};

export const updateComponent = async (req, res) => {};

export const deleteComponent = async (req, res) => {};
