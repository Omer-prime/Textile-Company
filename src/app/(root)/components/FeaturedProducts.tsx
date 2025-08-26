// src/app/(root)/components/FeaturedProducts.tsx
import Link from "next/link";
import { dbConnect } from "@/lib/mongoose";
import Featured from "@/models/Featured";
import Product from "@/models/Product";

export const runtime = "nodejs";

type FeaturedDoc = {
  _id: string;
  title?: string;
  productIds: string[];
};

type ProductCard = {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  categorySlug: string;
  subcategory?: string;
};

export default async function FeaturedProducts() {
  await dbConnect();

  // Make sure we read a SINGLE doc and strongly type it
  const list = await Featured.findOne({}).lean<FeaturedDoc | null>();
  if (!list || !list.productIds?.length) return null;

  const products = await Product.find(
    { _id: { $in: list.productIds } },
    { name: 1, slug: 1, image: 1, categorySlug: 1, subcategory: 1 }
  ).lean<ProductCard[]>();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-2">
            {list.title || "Featured Products"}
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Hand-picked by our team.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7">
          {products.map((prod) => (
            <Link
              key={prod._id}
              href={`/${prod.categorySlug}/${prod.subcategory || "all"}/${prod.slug}`}
              className="group bg-gray-50 rounded-2xl border border-gray-100 shadow hover:shadow-xl hover:-translate-y-2 transition overflow-hidden flex flex-col"
            >
              <div className="relative w-full h-52 overflow-hidden">
                <img
                  src={prod.image || "/placeholder.png"}
                  alt={prod.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 flex items-center justify-center p-4">
                <h3 className="text-lg text-blue-900 font-semibold text-center group-hover:text-orange-500">
                  {prod.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
