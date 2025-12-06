import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // ⚠️ 해시 X, 평문 비밀번호
  },
  { timestamps: true }
);

export default models.User || model("User", UserSchema);

