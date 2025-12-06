import mongoose, { Schema, model, models } from "mongoose";

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, default: "일반" },
  },
  { timestamps: true }
);

export default models.Post || model("Post", PostSchema);

