import { Schema, model, models } from "mongoose";
const TestimonialSchema = new Schema({
  name: { type: String, required: true },
  avatar: String,
  rating: { type: Number, min: 1, max: 5, default: 5 },
  review: { type: String, required: true },
}, { timestamps: true });

export default models.Testimonial || model("Testimonial", TestimonialSchema);
