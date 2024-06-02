const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create end point for order creation
router.post("/create-order", async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const order = await razorpay.orders.create({ amount, currency });
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Verify payment
router.post("/verify-payment", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
  shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = shasum.digest("hex");

  if (digest === razorpay_signature) {
    res.json({ status: "success" });
  } else {
    res.json({ status: "failure" });
  }
});

// Store payment details into payments.json

const filePath = path.join(__dirname, "payments.json");

router.post("/payment-details", (req, res) => {
  const paymentDetails = req.body;

  fs.readFile(filePath, (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Failed to read payment details" });
    }

    const payments = JSON.parse(data);
    payments.push(paymentDetails);

    fs.writeFile(filePath, JSON.stringify(payments, null, 2), (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to save payment details" });
      }
      res.json({ message: "Payment details saved successfully" });
    });
  });
});

module.exports = router;
