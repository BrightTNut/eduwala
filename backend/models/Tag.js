import { mongoose, Schema, model } from "mongoose";

const CategorySchema = new Schema({
  name: { type: String, required: true },
  decription: {
    type: String,
    trim: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
});

export default mongoose.model("Tag", CategorySchema);
