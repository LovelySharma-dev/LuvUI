import mongoose from "mongoose";
import { COMPONENT_CATEGORIES } from "../constants/categories.js";

const componentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: COMPONENT_CATEGORIES,
    },
    tags: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],

    previewImage: {
      type: String,
      default: "",
    },

    npmImport: {
      type: String,
      required: true,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Component = mongoose.model("Component", componentSchema);

export default Component;
