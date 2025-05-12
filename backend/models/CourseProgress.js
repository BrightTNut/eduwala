import mongoose from "mongoose";

const couresProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    refs: "User",
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    refs: "Course",
  },
  completedVideo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      refs: "SubSection",
    },
  ],
});

export default mongoose.model("CourseProgress", couresProgressSchema);
