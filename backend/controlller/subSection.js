import SubSection from "../models/SubSection.js";
import Section from "../models/Section.js";
import { imageUpload } from "../utils/imageUploader.js";
export const createSubSection = async (req, res) => {
  try {
    const { sectionId, title, timeDuration, description } = req.body;
    const { videoFile } = req.files;
    const data = { videoFile, sectionId, title, timeDuration, description };
    if (!sectionId || !title || !timeDuration || !description || !videoFile) {
      return res.status(401).json({
        success: false,
        message: "All fiealds are mandatory!!!",
        data,
      });
    }
    //upload video
    const uploadDetails = await imageUpload(videoFile, process.env.FOLDER_NAME);
    const subSectionDetails = await SubSection.create({
      title: title,
      timeDuration: timeDuration,
      description: description,
      videoUrl: uploadDetails.secure_url,
    });
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $push: {
          subSection: subSectionDetails._id,
        },
      },
      { new: true }
    ).populate("subSection");
    //TODO : log updated section details , after adding populate query
    return res.status(200).json({
      success: true,
      message: "Sub Section Added Successfully!!!",
      updatedSection,
    });
  } catch (error) {
    console.log(error);
    console.error(error);
    return res.status(401).json({
      success: false,
      message: "Error During Creating Sub Section!!!",
    });
  }
};

export const updateSubSection = async (req, res) => {
  try {
    //fetch id and data
    const { SectionId, subSectionId, title, timeDuration, description } =
      req.body;
    const { videoFile } = req.file;
    const uploadDetails = await imageUpload(videoFile, process.env.FOLDER_NAME);
    if (
      !SectionId ||
      !subSectionId ||
      !title ||
      !timeDuration ||
      !description ||
      !videoFile
    ) {
      return res.status(401).json({
        success: false,
        message: "All fiealds are mandatory!!!",
      });
    }
    //find by id and update , populate
    const section = await Section.findById(sectionId);
    const subSection = await section.subSection.id(subSectionId);
    subSection.title = title;
    subSection.timeDuration = timeDuration;
    subSection.description = description;
    subSection.videoUrl = uploadDetails.secure_url;
    await subSection.save();
    //return
    return res.statu(200).json({
      success: true,
      message: "Sub Section Updated Successfully!!!",
      upateSubSection,
    });
  } catch (error) {
    console.log(error);
    console.error(error);
    return res.status(401).json({
      success: false,
      message: "Error During Updating Sub  Section !!",
    });
  }
};

export const deleteSubSection = async (req, res) => {
  try {
    //fetch id, delete return
    const { sectionId, subSectionId } = req.body;
    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: { subSection: { _id: subSectionId } },
      },
      { new: true }
    );
    return res.status(200).json({
      status: true,
      messsage: "Sub Section Deleted Successfully!!",
    });
  } catch (error) {
    console.log(error);
    console.error(error);
    return res.status(401).json({
      success: false,
      message: "Error During Deleting Sub  Section !!",
    });
  }
};
