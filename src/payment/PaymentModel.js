import mongoose from "mongoose";

const Payment = mongoose.model("payments", {});

export const getPayment = (obj) => {
  return Payment.find();
};
