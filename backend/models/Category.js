import { mongoose, Schema, model } from "mongoose";

const CategorySchema = new Schema({
  name: { type: String, required: true },
  description: {
    type: String,
    trim: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
});

export default mongoose.model("Category", CategorySchema);
