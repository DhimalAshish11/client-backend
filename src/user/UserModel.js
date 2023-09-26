import UserSchema from "./UserSchema";

export const insertAdmin = (obj) => {
  return UserSchema(obj).save();
};

export const getUserByEmail = (email) => {
  return UserSchema.findOne({ email });
};

export const getAdminById = (_id) => {
  return UserSchema.findOne({ _id });
};
