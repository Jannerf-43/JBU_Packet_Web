import mongoose, { Schema, model, models } from "mongoose";

const CommentSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    author: { type: String, default: "익명" },
    content: { type: String, required: true }, // ⚠️ XSS 방어 없음
  },
  { timestamps: true }
);

export default models.Comment || model("Comment", CommentSchema);

