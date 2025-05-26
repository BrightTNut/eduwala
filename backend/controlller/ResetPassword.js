import User from "../models/User.js";
import mailSender from "../utils/mailSender.js";
//import { resetPassowrd } from "./Auth";
import bcrypt from "bcrypt";
import crypto from "crypto";
//resetPassword mail sending
export const resetPasswordToken = async (req, res) => {
  try {
    //get mail
    const { email } = req.body;
    //check user for mail
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User Email is Not Exites!!!",
      });
    }
    //generate token
    const token = crypto.randomBytes(20).toString("hex");
    //update user adding token and expiration time
    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPassowrdExpires: Date.now() + 5 * 60 * 1000,
      },
      { new: true }
    );
    //create url
    const url = `http://localhost:3000/update-password/${token}`;
    //send email containing an url
    await mailSender(email, "Password ResetLink", `Password ResetLink ${url}`);
    //return response
    return res.status(200).json({
      success: true,
      message: `Password Reset Link Has Been Sended to ${email} , Pleease Check Email!!s`,
    });
  } catch (error) {
    console.log(error);
    console.error(error);
    return res.status(401).json({
      success: false,
      message: "Error During Sending Password Reseting Url!!",
    });
  }
};

//resetPassword
export const resetPassword = async (req, res) => {
  try {
    //data fetch
    const { email, password, confirmPassword, token } = req.body;
    //validation
    if (password !== confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "Password and Confirm Password must be Same!!",
      });
    }
    //get data from db using token
    const user = await User.findOne({ token: token });
    //if token is invalid
    if (user.token !== token) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid!!",
      });
    }
    //if token is expires
    if (Date.now() > user.resetPassowrdExpires) {
      return res.status(401).json({
        success: false,
        message: "Url is Expires for Reseting Password!!",
      });
    }
    //hash password

    //update in database
    await User.findOneAndUpdate(
      { email: email },
      {
        password: password,
      },
      { new: true }
    );
    //response
    return res.status(400).json({
      success: true,
      message: "Password Reset Successfully!!!",
    });
  } catch (error) {
    console.log(error);
    console.error(error);
    return res.status(401).json({
      success: false,
      message: "Error During Resetting Password!!",
    });
  }
};
