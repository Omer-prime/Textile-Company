import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true, index: true },
     password: String,  // bcrypt hash
    role: { type: String, enum: ["ADMIN", "USER"], default: "ADMIN" },
  },
  { timestamps: true }
);

export type UserDoc = {
  _id: string;
  name?: string;
  email: string;
  password: string;
  role: "ADMIN" | "USER";
};

export default models.User || model("User", UserSchema);
