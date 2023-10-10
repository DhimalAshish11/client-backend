import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 8001;
import CategoryRouter from "./src/category/CategoryRouter.js";
import ProductRouter from "./src/product/ProductRouter.js";
import PaymentRouter from "./src/payment/PaymentRouter.js";
import UserRouter from "./src/user/UserRouter.js";
import StripeRouter from "./src/stripe/StripeRouter.js";

import cors from "cors";
app.use(cors());
app.use(express.json());

app.use("/api/v1/category", CategoryRouter);
app.use("/api/v1/product", ProductRouter);
app.use("/api/v1/payment", PaymentRouter);
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/create-payment-intent", StripeRouter);
import morgan from "morgan";
app.use(morgan("dev"));
import mongoConnect from "./src/config/mongoConfig.js";
mongoConnect();

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "server is live",
  });
});

app.use((error, req, res, next) => {
  res.json({
    status: "error",
    message: error.message,
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`server is running at http://localhost:${PORT}`);
});
