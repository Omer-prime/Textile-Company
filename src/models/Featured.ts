import { Schema, model, models, Types } from "mongoose";
const FeaturedSchema = new Schema({
  productIds: [{ type: Types.ObjectId, ref: "Product" }],
  title: { type: String, default: "Featured" }
}, { timestamps: true });

export default models.Featured || model("Featured", FeaturedSchema);
