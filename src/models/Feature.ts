import { Schema, model, models } from "mongoose";
const FeatureSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  iconKey: { type: String, default: "star" }, // store which icon to render client-side
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default models.Feature || model("Feature", FeatureSchema);
