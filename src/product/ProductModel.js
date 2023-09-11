import mongoose from "mongoose";

const product = mongoose.model("products", {});

export const getProduct = () => {
  return product.find();
};

export const getProductById = (_id) => {
  return product.findById(_id);
};

export default { getProduct, getProductById };
