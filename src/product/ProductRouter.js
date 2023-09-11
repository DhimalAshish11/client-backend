import { getProduct, getProductById } from "./ProductModel.js";
import express from "express";

const router = express.Router();

router.get("/:_id?", async (req, res, next) => {
  try {
    const { _id } = req.params;

    const products = _id ? await getProductById(_id) : await getProduct();

    res.json({
      status: "success",
      message: "Here are the product",
      products,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
