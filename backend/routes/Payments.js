// Import the required modules
import express from "express";
const router = express.Router();

import {
  //  capturePayment,
  verifySignature,
  // sendPaymentSuccessEmail,
} from "../controlller/Payments.js";
import { auth, isInstructor, isStudent, isAdmin } from "../middleware/auth.js";
//router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifyPayment", auth, isStudent, verifySignature);
// router.post(
//   "/sendPaymentSuccessEmail",
//   auth,
//   isStudent,
//   sendPaymentSuccessEmail
// );

export default router;
