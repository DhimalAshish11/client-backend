import UserSchema from "./UserSchema.js";

export const insertUser = (obj) => {
  return UserSchema(obj).save();
};

export const getUserByEmail = (email) => {
  return UserSchema.findOne({ email });
};

export const getUserById = (_id) => {
  return UserSchema.findOne({ _id });
};
export const updateUser = (filter, updateObj) => {
  return AdminSchema.findOneAndUpdate(filter, updateObj, { new: true });
};

export const getOneUser = (filter) => {
  return AdminSchema.findOne(filter);
};
