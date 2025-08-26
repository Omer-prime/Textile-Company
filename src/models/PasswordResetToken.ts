import { Schema, model, models } from "mongoose";

const PasswordResetTokenSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    tokenHash: { type: String, required: true, index: true },
    expiresAt: { type: Date, required: true },
    used: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export type PasswordResetTokenDoc = {
  _id: string;
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  used: boolean;
};

export default models.PasswordResetToken || model("PasswordResetToken", PasswordResetTokenSchema);
