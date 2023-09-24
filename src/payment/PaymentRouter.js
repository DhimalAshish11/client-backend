import express from "express";
import { getPayment } from "./PaymentModel.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await getPayment();

    res.json({
      status: "success",
      message: "Payment method has been added",
      result,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
