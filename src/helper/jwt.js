import jwt from "jsonwebtoken";
import { insertNewSession } from "../session/SessionModel.js";
import { updateUser } from "../user/UserModel.js";

export const createAccessJWT = async (email) => {
  const token = jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });

  await insertNewSession({ token, associate: email });
  return token;
};

export const verifyAccessJWT = (token) => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
};

export const createRefreshJWT = async (email) => {
  const refreshJWT = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });

  await updateUser({ email }, { refreshJWT });
  return refreshJWT;
};
