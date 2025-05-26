import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: { type: String, required: true, trim: true },
  password: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    enum: ["Student", "Instructor", "Admin"],
    required: true,
  },
  additionalDetails: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "Profile",
  },
  courses: {
    type: mongoose.Schema.Types.ObjectId,
    refs: "Course",
  },
  token: {
    type: String,
  },
  resetPassowrdExpires: {
    type: Date,
  },
  Image: {
    type: String,
  },
  CourseProgress: {
    type: mongoose.Schema.Types.ObjectId,
    refs: "CourseProgress",
  },
});

export default mongoose.model("User", userSchema);
