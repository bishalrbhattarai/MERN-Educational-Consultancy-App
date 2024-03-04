import express from "express";
const router = express.Router();
import { getAllPayments } from "../../controllers/payment/paymentControllers.js";

router.get("/getallpayments", getAllPayments);

export default router;
