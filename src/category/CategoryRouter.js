import express from "express";

import { getCategories, getCategoryById } from "../category/CategoryModel.js";

const router = express.Router();

router.get("/:_id?", async (req, res, next) => {
  try {
    console.log("inside router");
    const { _id } = req.params;

    const result = _id ? await getCategoryById(_id) : await getCategories();
    result
      ? res.json({
          status: "success",
          message: "Products display successfull",
          result,
        })
      : res.json({
          status: "error",
          message: "no products found",
        });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;
