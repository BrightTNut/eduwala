import Course from "../models/Course.js";
import CourseProgress from "../models/CourseProgress.js";
import Section from "../models/Section.js";
import SubSection from "../models/SubSection.js";
import Tag from "../models/Tag.js";
import User from "../models/User.js";
import { imageUpload } from "../utils/imageUploader.js";
import Category from "../models/Category.js";
//create course
export const createCourse = async (req, res) => {
  try {
    // Get user ID from request object
    const userId = req.user.id;

    // Get all required fields from request body
    let {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag: _tag,
      category,
      status,
      instructions: _instructions,
    } = req.body;
    // Get thumbnail image from request files
    const thumbnail = req.files.thumbnailImage;

    // Convert the tag and instructions from stringified Array to Array
    const tag = JSON.parse(_tag);
    const instructions = JSON.parse(_instructions);
    console.log(
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag.length,
      thumbnail,
      category,
      instructions.length
    );

    // Check if any of the required fields are missing
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag.length ||
      !thumbnail ||
      !category ||
      !instructions.length
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      });
    }
    if (!status || status === undefined) {
      status = "Draft";
    }
    // Check if the user is an instructor
    const instructorDetails = await User.findById(userId, {
      accountType: "Instructor",
    });

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details Not Found",
      });
    }

    // Check if the tag given is valid
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details Not Found",
      });
    }
    // Upload the Thumbnail to Cloudinary
    const thumbnailImage = await imageUpload(
      thumbnail,
      process.env.FOLDER_NAME
    );
    console.log(thumbnailImage);
    // Create a new course with the given details
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      tag,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      status: status,
      instructions,
    });

    // Add the new course to the User Schema of the Instructor
    await User.findByIdAndUpdate(
      {
        _id: instructorDetails._id,
      },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );
    // Add the new course to the Categories
    const categoryDetails2 = await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );
    console.log("HEREEEEEEEE", categoryDetails2);
    // Return the new course and a success message
    res.status(200).json({
      success: true,
      data: newCourse,
      message: "Course Created Successfully",
    });
  } catch (error) {
    // Handle any errors that occur during the creation of the course
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};

// Edit Course Details
export const editCourse = async (req, res) => {};

//get all courses
export const getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        ratingAndReview: true,
        studentEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();

    return res.status(200).json({
      success: true,
      message: "All Courses Fetched Successfully!!",
      allCourses,
    });
  } catch (error) {
    console.log(error);
    console.error(error);
    return res.status(401).json({
      success: false,
      message: "Error while getting all Courses!!",
    });
  }
};

//get course details
export const getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    if (!courseId) {
      return res.staus(401).json({
        success: false,
        message: "Course ID not Provided!!",
      });
    }
    const course = await Course.findById({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();
    if (!course) {
      return res.status(401).json({
        success: false,
        message: "Could not find Course!!",
      });
    }

    return res.status(401).json({
      success: true,
      message: "Course fetch successfully!!",
      course,
    });
  } catch (error) {
    console.log(error);
    console.error(error);
    return res.status(401).json({
      success: false,
      message: "Error during Course fetching!!",
    });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    // Find the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    const studentEnrolleds = course.studentsEnrolled;
    for (const studentId of studentEnrolleds) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      });
    }

    //deleting section and subSection
    const sections = course.courseContent;
    for (const sectionId of sections) {
      currSection = await Section.findById(sectionId);
      if (currSection) {
        subSectionIds = currSection.SubSection;
        for (const subSectionId of subSectionIds) {
          await SubSection.findByIdAnddelete(subSectionId);
        }
      }

      await Section.findByIdAnddelete(sectionId);
    }
    await Course.findByIdAnddelete(courseId);
    return res.status(200).json({
      success: true,
      message: "Course Deleted Successfullly!!!!",
    });
  } catch (error) {
    console.log(error);
    console.error(error);
    return res.status(200).json({
      success: false,
      message: "Course Deletiton error happen!!!!",
    });
  }
};

export const getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const { userId } = req.user.id;
    const courseDeatils = await Course.findById(
      { _id: courseId }
        .populate({
          path: "instructor".populate({
            path: "additionalDetails",
          }),
        })
        .populate({
          path: "courseContent".populate({
            path: "subSection",
          }),
        })
        .populate({
          path: "ratingAndReviews",
        })
        .populate({
          path: "category",
        })
        .exec()
    );
    const courseProgress = await CourseProgress.findOne({
      courseId: courseId,
      userId: userId,
    });
    console.log("courseProgressCount : ", courseProgressCount);

    if (!courseDeatils) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      });
    }

    //time duration of course
    let totalDurationInSeconds = 0;
    courseDeatils.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration);
        totalDurationInSeconds += timeDurationInSeconds;
      });
    });

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);
    return res.status(200).json({
      success: true,
      data: {
        courseDeatils,
        totalDuration,
        completedVideos: courseProgress?.completedVideo
          ? courseProgress?.completedVideo
          : [],
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get a list of Course for a given Instructor
export const getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id;

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 });

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    });
  }
};
