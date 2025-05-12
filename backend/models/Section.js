import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
  sectionName: {
    type: String,
  },
  subSection: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refs: "SubSection",
  },
});

export default mongoose.model("Section", sectionSchema);
