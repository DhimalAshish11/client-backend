import SessionSchema from "./SessionSchema.js";

export const insertNewSession = (obj) => {
  return SessionSchema(obj).save();
};

export const deleteSession = async (token) => {
  const data = await SessionSchema.findOneAndDelete({ token });
};

export const deleteSessionByFilter = async (filter) => {
  const dt = await SessionSchema.findOneAndDelete(filter);
  return dt;
};
