import mongoose from "mongoose";
import mailSender from "../utils/mailSender.js";
const OtpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60,
  },
});

//send email function
async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email From EduWala",
      otp
    ).catch((err) => console.error(err));
    console.log("Email Sended to", email);
  } catch (error) {
    console.error("Error in OTP Schema Wile sending function", error);
  }
}

OtpSchema.pre("save", async function (next) {
  await sendVerificationEmail(this.email, this.otp);
  console.log("Email sent SuccessFully");
});

export default mongoose.model("Otp", OtpSchema);
