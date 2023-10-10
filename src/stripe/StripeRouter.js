import express from "express";
import Stripe from "stripe";
const router = express.Router();
router.post("/", async (req, res) => {
  const secret = process.env.Secret_key;
  const stripe = new Stripe(secret);
  const { amount, currency, paymentMethodType } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency,
    payment_method_types: [paymentMethodType],
  });
  res.json({
    clientSecret: paymentIntent.client_secret,
  });
  console.log(paymentIntent.client_secret);
});
export default router;
