import orderSchema from "./orderSchema.js";

export const insertOrder = (obj) => {
  console.log(obj, "ordermodel");
  return orderSchema(obj).save();
};

export const getOrderingByEmail = (email) => {
  return orderSchema.findOne(email);
};
export const getOrderingByToken = (orderNumber) => {
  console.log(orderNumber);
  return orderSchema.findOne({ orderNumber: orderNumber });
};

export const getOrdering = () => {
  return orderSchema.find();
};
export const getOrderById = (_id) => {
  return orderSchema.findOne({ _id });
};
