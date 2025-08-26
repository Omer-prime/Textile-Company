import { Schema, model, models } from "mongoose";

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: String,
    image: String,
  },
  { timestamps: true }
);

// export type CategoryDoc = {
//   _id: string;
//   name: string;
//   slug: string;
//   description?: string;
//   image?: string;
// };

export default models.Category || model("Category", CategorySchema);
