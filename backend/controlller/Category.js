import Category from "../models/Category.js";
import Course from "../models/Course.js";

//create Category Handler
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.statu(401).json({
        success: false,
        message: "All fiealds are required!!",
      });
    }
    const CategoryDetails = await Category.create({
      name: name,
      description: description,
    });
    console.log(CategoryDetails);
    return res.status(200).json({
      success: true,
      message: `${name} Category Created SuccessFullly!!`,
    });
  } catch (error) {
    console.log(error);
    console.error(error);
    return res.status(401).json({
      success: false,
      message: "Error during Category creation in /controller/tag.js",
    });
  }
};

//getAllCategorys handler function
export const showAllCategories = async (req, res) => {
  try {
    const allCategorys = await Category.find({
      name: name,
      description: description,
    });
    return res.status(200).json({
      success: true,
      message: "All Categorys Fectched Successfully!!!",
    });
  } catch (error) {
    console.log(error);
    console.error(error);
    return res.status(401).json({
      sucess: false,
      message: "error during Category fetching!!",
    });
  }
};

//CategoryPageDetails
export const CategoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;
    const selectedCategories = await Category.findById(categoryId)
      .populate(course)
      .exec();
    if (!Categories) {
      return res.status(401).json({
        success: false,
        message: "Category Course not found!!",
      });
    }

    ///course for different Categories courses
    const differentCategories = await Category.find({
      _id: { $ne: categoryId },
    })
      .populate("course")
      .exec();

    //top selling coures
    const topSellingCourses = await Course.aggregate([
      {
        $addFields: {
          enrolledCount: { $size: "$studentsEnrolled" }, // count the students
        },
      },
      {
        $sort: { enrolledCount: -1 }, // sort by count descending
      },
      {
        $limit: 10, // optional: limit to top 10 courses
      },
    ]);

    return status(200).json({
      success: true,
      data: {
        selectedCategories,
        topSellingCourses,
        differentCategories,
      },
    });
  } catch (error) {
    console.log(error);
    console.error(error);
    return res.status(401).json({
      sucess: false,
      message: "error during Category Page Details fetching!!",
    });
  }
};
