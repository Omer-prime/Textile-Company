import { dbConnect } from "@/lib/mongoose";
import Product from "@/models/Product";
import ProductDetailClient from "./product-client";

type VariantImg = { url: string; alt?: string; sortOrder?: number };
type Variant = { colorName?: string; colorHex?: string; images?: VariantImg[] };
type ProductDoc = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  sizes?: string[];
  variants?: Variant[];
};

export const runtime = "nodejs";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string; subcategory: string; slug: string }>;
}) {
  const { category, subcategory, slug } = await params; // ⬅️ await params
  await dbConnect();

  const prod = await Product.findOne(
    {
      $and: [
        { $or: [{ categorySlug: category }, { "category.slug": category }] },
        { $or: [{ subcategorySlug: subcategory }, { subcategory }] },
        { slug },
      ],
    },
    {}
  ).lean<ProductDoc | null>();

  if (!prod) return <div className="max-w-6xl mx-auto p-6">Product not found.</div>;

  // ensure _id is string for serialization
  const serial: ProductDoc = { ...prod, _id: String((prod as any)._id) };

  return <ProductDetailClient product={serial} />;
}
