import mongoose from "mongoose";

const category = mongoose.model("categories", {});

export const getCategories = () => {
  return category.find();
};

export const getCategoryById = (_id) => {
  return category.findById(_id);
};

export default { getCategories, getCategoryById };
