import bcrypt from "bcryptjs";

const salt = 10;
export const hassPassword = (plainPass) => {
  return bcrypt.hashSync(plainPass, salt);
};

export const comparePassword = (plainPass, hassPass) => {
  return bcrypt.compareSync(plainPass, hassPass);
};
