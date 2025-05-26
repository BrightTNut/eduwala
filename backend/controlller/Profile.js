import Coures from "../models/Course.js";
import Profile from "../models/Profile.js";
import User from "../models/User.js";
import { imageUpload } from "../utils/imageUploader.js";
export const updaetProfile = async (req, res) => {
  try {
    const { dateOfBirth = "", about = "", gender, contactNumber } = req.body;
    const { userId } = req.user.id;
    if (!gender || !contactNumber) {
      return res.status(401).json({
        success: false,
        message: "Gender and Number is Mandatory!!",
      });
    }
    //find profile
    const userDetails = await User.findById(userId);
    const profileId = userDetails.additionalDetails;
    const profileDetails = await Profile.findById(profileId);
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.gender = gender;
    profileDetails.about = about;
    profileDetails.contactNumber = contactNumber;
    await profileDetails.save();
    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully1",
    });
  } catch (error) {
    console.log(error);
    console.error(error);
    return res.status(401).json({
      success: false,
      message: "Error During Updating Profile Details !!",
    });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const userDetails = await User.findById({ _id: userId });
    if (!userDetails) {
      return res.status(401).json({
        success: false,
        message: "User not found !!",
      });
    }
    //todo unenrolled from all enrolled courses
    await Coures.findOneAndDelete({ studentEnrolled: userId });
    await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });
    await User.findByIdAndDelete({ _id: userId });

    return res.status(200).json({
      success: true,
      messsage: "Account Deleted Successfully !!!",
    });
  } catch (error) {
    console.log(error);
    console.error(error);
    return res.status(401).json({
      success: false,
      message: "Error during Deleting Account!!",
    });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const { id } = req.user;
    const Userd = await User.findById(id).populate("additionalDetails").exec();
    return res.status(200).json({
      success: true,
      message: "All user Fetched!!!",
      data: Userd,
    });
  } catch (error) {
    console.log(error);
    console.error(error);
    return res.status(401).json({
      success: false,
      message: "Error during fetching Account!!",
    });
  }
};

export const getEnrolledCourses = async (req, res) => {};

export const instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Coures.find({ instructor: req.user.id });

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnroled.length;
      const totalAmountGenerated = totalStudentsEnrolled * course.price;

      // Create a new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        // Include other course properties as needed
        totalStudentsEnrolled,
        totalAmountGenerated,
      };

      return courseDataWithStats;
    });

    res.status(200).json({ courses: courseData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;
    const image = await imageUpload(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    console.log(image);
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    );
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    });
  } catch (error) {
    console.log("ERror in controller");
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const {
      firstName = "",
      lastName = "",
      dateOfBirth = "",
      about = "",
      contactNumber = "",
      gender = "",
    } = req.body;
    const id = req.user.id;

    // Find the profile by id
    const userDetails = await User.findById(id);
    const profile = await Profile.findById(userDetails.additionalDetails);

    const user = await User.findByIdAndUpdate(id, {
      firstName,
      lastName,
    });
    await user.save();

    // Update the profile fields
    profile.dateOfBirth = dateOfBirth;
    profile.about = about;
    profile.contactNumber = contactNumber;
    profile.gender = gender;

    // Save the updated profile
    await profile.save();

    // Find the updated user details
    const updatedUserDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    return res.json({
      success: true,
      message: "Profile updated successfully",
      updatedUserDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
