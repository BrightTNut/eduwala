import Course from "../models/Course.js";
import Section from "../models/Section.js";

export const createSection = async (req, res) => {
  try {
    const { sectionName, courseId } = req.body;
    if (!sectionName || !courseId) {
      return res.status(401).json({
        success: false,
        message: "Missing Properties!!",
      });
    }

    const newSection = await Section.create({ sectionName });
    const updateCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Section Created Successfully!!",
      updateCourse,
    });
  } catch (error) {
    console.log(error);
    console.error(error);
    return res.status(401).json({
      success: false,
      message: "Error during creating Section in Controller!!",
      error: error.message,
    });
  }
};

//update section
export const updateSection = async (req, res) => {
  try {
    const { sectionName, sectionId } = req.body;
    if (!sectionId || !sectionName) {
      return res.staus(401).json({
        success: false,
        message: "Error during updatting Section in Controller!!",
        error: error.message,
      });
    }
    const section = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Section Updated Successfully!!",
    });
  } catch (error) {
    console.log(error);
    console.error(error);
    return res.staus(401).json({
      success: false,
      message: "Error during updating Section in Controller!!",
      error: error.message,
    });
  }
};

//detele  section
export const deleteSection = async (req, res) => {
  try {
    const { sectionId } = req.body;
    await Section.findByIdAndDelete(sectionId);
    return res.status(200).json({
      success: true,
      message: "Section deleted Successfully!!",
    });
  } catch (error) {
    console.log(error);
    console.error(error);
    return res.staus(401).json({
      success: false,
      message: "Error during deleting Section in Controller!!",
      error: error.message,
    });
  }
};
