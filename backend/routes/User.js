// Import the required modules
import express from "express";
const router = express.Router();

// Import the required controllers and middleware functions
import { login, SignUp, sendOtp, changePassowrd } from "../controlller/Auth.js";
import {
  resetPasswordToken,
  resetPassword,
} from "../controlller/ResetPassword.js";

import { auth } from "../middleware/auth.js";

// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login", login);

// Route for user signup
router.post("/signup", SignUp);

// Route for sending OTP to the user's email
router.post("/sendotp", sendOtp);

// Route for Changing the password
router.post("/changepassword", auth, changePassowrd);

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken);

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword);

// Export the router for use in the main application
export default router;
