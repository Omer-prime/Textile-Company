// src/app/(root)/[category]/[subcategory]/page.tsx
import Link from "next/link";
import { dbConnect } from "@/lib/mongoose";
import Product from "@/models/Product";

export const runtime = "nodejs";

// Next.js 15: params is async – await it.
type Params = Promise<{ category: string; subcategory: string }>;

type ProductCard = {
  _id: string;
  name: string;
  slug: string;
  image?: string;
};

export default async function SubcategoryPage({ params }: { params: Params }) {
  const { category, subcategory } = await params;

  await dbConnect();

  // Combine both OR blocks under a single AND
  const items = await Product.find(
    {
      $and: [
        { $or: [{ categorySlug: category }, { "category.slug": category }] },
        { $or: [{ subcategorySlug: subcategory }, { subcategory }] },
      ],
    },
    { name: 1, slug: 1, image: 1 }
  )
    .sort({ createdAt: -1 })
    .lean<ProductCard[]>();

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold text-blue-800 mb-6 capitalize">
        {subcategory} in {category}
      </h1>

      {!items.length ? (
        <div className="text-gray-500">No products found.</div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-7">
          {items.map((prod) => (
            <Link
              key={prod._id}
              href={`/${category}/${subcategory}/${prod.slug}`}
              className="group bg-white rounded-xl shadow hover:shadow-xl transition border border-gray-100 overflow-hidden"
            >
              <img
                src={prod.image || "/placeholder.png"}
                alt={prod.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="text-blue-900 font-semibold group-hover:text-orange-500">
                  {prod.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
