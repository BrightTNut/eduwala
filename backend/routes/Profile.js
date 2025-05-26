import express from "express";
const router = express.Router();
import { auth, isInstructor } from "../middleware/auth.js";
import {
  deleteAccount,
  updateProfile,
  getUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
  instructorDashboard,
} from "../controlller/Profile.js";

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile", auth, deleteAccount);
router.put("/updateProfile", auth, updateProfile);
router.get("/getUserDetails", auth, getUserDetails);
// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);

router.get("/instructorDashboard", auth, isInstructor, instructorDashboard);

export default router;
