import RatingAndReview from "../models/RatingAndReview.js";
import Course from "../models/Course.js";

export const createRating = async (req, res) => {
  try {
    const { userId } = req.user.id;
    const { rating, courseId, review } = req.body;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not found!!",
      });
    } else if (!rating || !review) {
      return res.status(401).json({
        success: false,
        message: "Provide Rating and Review!!",
      });
    } else if (!courseId) {
      return res.status(401).json({
        success: false,
        message: "Course not found!!",
      });
    }

    const courseDetails = await Course.findOne(
      { _id: courseId },
      {
        studentsEnrolled: { $elemMatch: { $eq: userId } },
      }
    );

    if (!courseDetails) {
      return res.status(401).json({
        success: false,
        message: "User is not enrolled in this course!!",
      });
    }
    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });
    if (alreadyReviewed) {
      return res.status(401).json({
        success: false,
        message: "User reviewed course already!!",
      });
    }

    const ratingReview = await RatingAndReview.create({
      user: userId,
      course: courseId,
      rating: rating,
      review: review,
    });
    await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: {
          ratingAndReviews: ratingReview._id,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Rating And Review Created Successfully!",
    });
  } catch (error) {
    console.log(error);
    console.error(error);
    return res.status(401).json({
      success: false,
      messsage: "Error during rating and review creation !!",
    });
  }
};

// get Average rating
export const getAverageRating = async (req, res) => {
  try {
    const { courseId } = req.body.courseId;
    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);
    if (result.lenght > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "No Rating and Reviews yet !!",
      });
    }
  } catch (error) {
    console.log(error);
    console.error(error);
    return res.status(401).json({
      success: false,
      message: "Error during getting avg rating!!",
    });
  }
};

//get all rating
export const getAllRating = async (req, res) => {
  try {
    const result = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({ path: "course", select: "courseName" });

    return res.status(200).json({
      success: true,
      message: "All review and rating fetched successfully!!!",
      data: result,
    });
  } catch (error) {
    console.log(error);
    console.error(error);
    return res.status(401).json({
      success: false,
      message: "Error during getting all rating!!",
    });
  }
};

//get course ratings
export const getRatings = async (req, res) => {
  try {
    const { courseId } = req.body;
    const result = await RatingAndReview.find(
      { course: courseId }.populate({
        path: "course",
        select: "ratingAndReviews",
      })
    );

    if (result.lenght > 0) {
      return res.status(200).json({
        success: true,
        ratingAndReviews: result,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "No Rating and Reviews yet !!",
      });
    }
  } catch (error) {
    console.log(error);
    console.error(error);
    return res.status(401).json({
      success: false,
      message: "Error during getting course rating rating!!",
    });
  }
};
