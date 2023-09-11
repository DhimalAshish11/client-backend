import {
  getProduct,
  getProductByCategory,
  getProductById,
} from "./ProductModel.js";
import express from "express";

const router = express.Router();

router.get("/:_id?", async (req, res, next) => {
  try {
    const { _id } = req.params;

    const results = _id ? await getProductById(_id) : await getProduct();
    console.log(results);
    res.json({
      status: "success",
      message: "Here are the product",
      results,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/category/:_id?", async (req, res, next) => {
  try {
    const { _id } = req.params;

    const products = await getProductByCategory(_id);
    console.log(results);
    res.json({
      status: "success",
      message: "Here are the product by Category",
      products,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
