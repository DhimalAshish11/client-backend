import express from "express";
import { comparePassword, hassPassword } from "../helper/bcrypt.js";
import { v4 as uuidv4 } from "uuid";
import {
  getUserByEmail,
  insertUser,
  updateUser,
  updateUserById,
} from "./UserModel.js";
import {
  accountVerificationEmail,
  accountVerifiedNotification,
  passwordChangedNotification,
  sendOTPNotification,
} from "../helper/nodemailer.js";
import { auth, refreshAuth } from "../middleware/authMiddleware.js";
import { createAccessJWT, createRefreshJWT } from "../helper/jwt.js";
import {
  deleteSession,
  deleteSessionByFilter,
  insertNewSession,
} from "../session/SessionModel.js";
import { otpGenerator } from "../helper/RequestOTP.js";
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

router.post("/", async (req, res, next) => {
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

      const link = ` ${process.env.WEB_DOMAIN}/user-verification?c=${result.verificationCode}&e=${result.email}`;

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

router.get("/get-accessjwt", refreshAuth);

router.post("/user-verification", async (req, res, next) => {
  try {
    const { c, e } = req.body;
    console.log(req.body);
    const filter = {
      email: e,
      verificationCode: c,
    };
    const updateObj = {
      isVerified: true,
      verificationCode: "",
    };
    const result = await updateUser(filter, updateObj);

    if (result?._id) {
      await accountVerifiedNotification(result);
      res.json({
        status: "success",
        message: "Your account has been verified, you may login now!",
      });

      return;
    }
    res.json({
      status: "error",
      message: "Link is expired or invalid!",
    });
  } catch (error) {
    next(error);
  }
});

router.post("/sign-in", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    ///find user by email

    const user = await getUserByEmail(email);

    if (user?._id) {
      ///check the password
      const isMatched = comparePassword(password, user.password);

      if (isMatched) {
        ///create 2 jwts

        const accessJWT = await createAccessJWT(email);
        const refreshJWT = await createRefreshJWT(email);

        ///create accessJWT and store in session table: short live 15 min
        ///create refeshJWT and store with the user data in user data in user table:long live

        return res.json({
          status: "success",
          message: "Logged in Successfully",
          token: { accessJWT, refreshJWT },
        });
      }
    }

    res.json({
      status: "error",
      message: "Invalid log in",
    });
  } catch (error) {
    next(error);
  }
});

router.post("/logout", async (req, res, next) => {
  try {
    const { accessJWT, refreshJWT, _id } = req.body;

    accessJWT && deleteSession(accessJWT);

    if (refreshJWT && _id) {
      const dt = await updateUserById({ _id, refreshJWT: "" });
    }

    res.json({
      status: "success",
    });
  } catch (error) {
    next(error);
  }
});

router.post("/request-otp", async (req, res, next) => {
  try {
    const { email } = req.body;
    if (email) {
      const user = await getUserByEmail(email);
      if (user?._id) {
        const otp = otpGenerator();
        const obj = {
          token: otp,
          associate: email,
        };
        const result = await insertNewSession(obj);
        if (result?._id) {
          await sendOTPNotification({
            otp,
            email,
            fName: user.fName,
          });
        }
      }
    }
    res.json({
      status: "success",
      message:
        "If your email exit you will receive email into your mailbox,please check your email for the instruction and otp",
    });
  } catch (error) {
    next(error);
  }
});

router.post("/reset-password", async (req, res, next) => {
  try {
    const { email, password, otp } = req.body;

    if (email && password) {
      // check if the token is valid

      const result = await deleteSessionByFilter({
        token: otp,
        associate: email,
      });

      if (result?._id) {
        //check user exist

        const user = await getUserByEmail(email);
        if (user?._id) {
          // encrypt the password

          const hashPass = hassPassword(password);

          const updatedUser = await updateUser(
            { email },
            { password: hashPass }
          );
          if (updatedUser?._id) {
            // send email notification

            await passwordChangedNotification({
              email,
              fName: updatedUser.fName,
            });

            return res.json({
              status: "success",
              message: "Your password has been updated, you may login now.",
            });
          }
        }
      }
    }
    res.json({
      status: "error",
      message: "Invalid request or token",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
