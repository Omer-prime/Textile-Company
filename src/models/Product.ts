import mongoose, { Schema, model, models } from "mongoose";

const ImageSchema = new Schema(
  {
    url: { type: String, required: true },
    alt: { type: String },
    sortOrder: { type: Number, default: 0 },
  },
  { _id: false }
);

const VariantSchema = new Schema(
  {
    colorName: { type: String, required: true },
    colorHex: { type: String, required: true },
    images: { type: [ImageSchema], default: [] },
  },
  { _id: false }
);

const SizeSchema = new Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false }
);

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    categorySlug: { type: String, required: true },
    subcategory: { type: String },
    image: { type: String },
    description: { type: String },

    // IMPORTANT: sizes as array of objects
    sizes: [String],          // keep sizes as simple string array
  variants: [VariantSchema] // color/image variations
  },
  { timestamps: true }
);

const Product = models.Product || model("Product", ProductSchema);
export default Product;
