import bcrypt from "bcrypt";
import User from "../models/User.js";
import Otp from "../models/Otp.js";
import Profile from "../models/Profile.js";
import otpGenerator from "otp-generator";
import jwt from "jsonwebtoken";
import mailSender from "../utils/mailSender.js";

//sendOTP
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const checkUserExits = await User.findOne({ email });
    if (checkUserExits) {
      return res.status(401).json({
        sucess: false,
        messgae: "User Already Exist!!",
      });
    }

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log(otp);

    var OtpUniqe = await Otp.findOne({ otp: otp });

    while (OtpUniqe) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      OtpUniqe = await Otp.findOne({ otp: otp });
    }

    const otpPayload = { email, otp };

    try {
      const OtpBody = Otp.create(otpPayload);
      console.log("✅ OTP saved to DB:", OtpBody);
    } catch (error) {
      console.error("❌ Error saving OTP to DB:", error);
    }
    return res.status(200).json({
      sucess: true,
      message: "Otp Send SuccessFully!!",
    });
  } catch (e) {
    console.log("Error during otp Sending in controller/Auth.js/sentotp", e);
    console.error("Error during otp Sending in controller/Auth.js/sentotp", e);
  }
};
//signUp
export const SignUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      contactNumber,
      password,
      confirmPassword,
      accountType,
      additionalDetails,
      otp,
    } = req.body;

    //valiate
    if (!firstName || !lastName || !email || !password || !otp) {
      return res.status(403).json({
        sucess: false,
        message: "Please Fill All Essential info!!",
      });
    }
    if (password !== confirmPassword) {
      return res.status(403).json({
        sucess: false,
        message: "password and confirmPassword must be same!!",
      });
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(403).json({
        sucess: false,
        message: "User Already registered!!",
      });
    }

    const recentOtp = await Otp.find({ email: email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log("db otp", `${recentOtp[0].otp}`, "otp", otp);
    if (recentOtp.length == 0) {
      return res.status(403).json({
        sucess: false,
        message: "Otp not Valid!!",
      });
    } else if (otp !== `${recentOtp[0].otp}`) {
      console.log("OTP rqest payload", recentOtp);
      return res.status(403).json({
        sucess: false,
        message: "Otp do not match!!",
      });
    }

    //hash password

    //for additionalDetails
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      contactNumber: null,
      about: null,
    });
    const UserResult = User.create({
      firstName,
      lastName,
      email,
      password,
      accountType,
      additionalDetails: profileDetails._id,
      Image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName},${lastName}`,
    });
    res.status(200).json({
      success: true,
      message: "User Created Sucessfully !!",
      result: UserResult,
    });
  } catch (error) {
    console.log("Error during otp Sending in controller/Auth.js/SignUp", error);
    console.error(
      "Error during otp Sending in controller/Auth.js/SignUp",
      error
    );
  }
};

//Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(403).json({
        sucess: false,
        message: "Enter Both Fieald!!",
      });
    }

    const user = await User.findOne({
      email,
    }).populate("additionalDetails");
    if (!user) {
      return res.status(403).json({
        sucess: false,
        message: "User Not Exist!!",
      });
    }

    //check password , genrate token
    if (password == user.password) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      user.token = token;
      user.password = undefined;
      //cookies
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        messgae: "Logged in Successfully!!",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is Incorrect!!!",
      });
    }
  } catch (error) {
    console.log("Error during Login in controller/Auth.js/login", error);
    console.error("Error during login4 in controller/Auth.js/login", error);
    res.status(401).json({
      success: false,
      message: "Login Failed Try Again!!!",
    });
  }
};

//changePassword
export const changePassowrd = async (req, res) => {
  try {
    //get data from body
    const { email, newPassword, confirmPassword } = req.body;
    if (confirmPassword !== newPassword) {
      return res.status(401).json({
        success: false,
        message: " newPassword and confirmPassword need to be Same!!!",
      });
    }
    //hash password
    const hashPassword = bcrypt.hash(newPassword, 10);
    // get old password
    const oldPassword = await User.findOne({ email: email }).password;

    //validation
    if (bcrypt.compare(hashPassword, oldPassword)) {
      return res.status(401).json({
        success: false,
        message: "Old and New Password must be Different!!!s",
      });
    }

    //update in database
    await User.findOneAndUpdate(
      { email: email },
      {
        password: hashPassword,
      },
      { new: true }
    );
    //send mail = pass updated
    await mailSender(
      email,
      "Password Changed At Eduwala!!",
      "Password Change Successfully!!"
    );
    //return
    return res.status(200).json({
      success: true,
      message: "Password Updated Successfully!!!",
    });
  } catch (error) {
    console.log(error);
    console.error(error);
    return res.status(401).json({
      success: false,
      message: "Password Updating failed!!!",
    });
  }
};
