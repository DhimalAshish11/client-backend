import express from "express";
import { hassPassword } from "../helper/bcrypt.js";
import { v4 as uuidv4 } from "uuid";
import { insertUser } from "./UserModel.js";
import { accountVerificationEmail } from "../helper/nodemailer.js";
import { auth } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", auth, (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "Here is the user Info",
      user: req.userInfo,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    //encrypt password

    const { password } = req.body;

    req.body.password = hassPassword(password);

    req.body.verificationCode = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

    const result = await insertUser(req.body);

    if (result?._id) {
      res.json({
        status: "success",
        message:
          "Please check your email and follow the instruction to activate your acount",
      });

      const link = ` ${process.env.WEB_DOMAIN}/admin-verification?c=${result.verificationCode}&e=${result.email}`;

      await accountVerificationEmail({
        fName: result.fName,
        email: result.email,
        link,
      });
      return;
    }
    res.json({
      status: "error",
      message: "Unable to create the account, please try again later",
    });
  } catch (error) {
    let msg = error.message;

    if (msg.includes("E11000 duplicate key error")) {
      error.statusCode = 400;

      error.message =
        "This email is already used by another admin, please use different email";
    }

    next(error);
  }
});

export default router;
