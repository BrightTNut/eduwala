import Course from "../models/Course.js";
import CourseProgress from "../models/CourseProgress.js";
import Section from "../models/Section.js";
import SubSection from "../models/SubSection.js";
import Tag from "../models/Tag.js";
import User from "../models/User.js";
import { imageUpload } from "../utils/imageUploader.js";

//create course
export const createCourse = async (req, res) => {
  try {
    const { courseName, coureseDecription, whatYouWillLearn, price, tag } =
      req.body;
    const thumbnail = req.files.thumbnailImage;

    //validation
    if (
      !courseName ||
      !coureseDecription ||
      !whatYouWillLearn ||
      !price ||
      !tag
    ) {
      return res.status(401).json({
        success: false,
        message: "All fields are mandatory !!",
      });
    }

    //crate for instructor
    const userId = req.user.id;
    const instructorDetails = await User.findById(userId);
    if (!instructorDetails) {
      return res.status(401).json({
        success: false,
        message: "Instructor not found in Database!!",
      });
    }

    //check given tag is avilable
    const tagDetails = await Tag.findById(tag);
    if (!tagDetails) {
      return res.status(401).json({
        success: false,
        message: "Tag is Invalid!!",
      });
    }

    //upload Image top Cloudinary
    const thumbnailImage = await imageUpload(
      thumbnail,
      process.env.FOLDER_NAME
    );

    //create entry for new course
    const newCourse = await Course.create({
      courseName,
      coureseDecription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      tag: tagDetails._id,
      thumbnail: thumbnailImage.secure_url,
    });

    //add new course to instrutor course list
    await User.findByIdAndUpdate(
      {
        _id: instructorDetails._id,
      },
      {
        $push: { courses: newCourse._id },
      },
      { new: true }
    );

    //update tag Schema
    await Tag.create({
      name: tag,
      decription: coureseDecription,
      course: newCourse._id,
    });

    // return response
    return res.status(200).json({
      success: true,
      message: "Course created Successfully!!",
    });
  } catch (error) {
    console.log(error);
    console.error(error);
    return res.status(401).json({
      success: false,
      message: "Course created Successfully!!",
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
    const course = await Course.findById(
      { _id: courseId }.populate(
        {
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        }
          .populate("category")
          .populate("ratingAndReviews")
          .populate({
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          })
      )
    ).exec();
    if (!course) {
      return res.status(401).json({
        success: false,
        message: "Could not find Course!!",
      });
    }

    return res.status(401).json({
      success: true,
      message: "Course fetch successfully!!",
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
