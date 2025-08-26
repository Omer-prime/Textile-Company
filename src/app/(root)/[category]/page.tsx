import Link from "next/link";
import { dbConnect } from "@/lib/mongoose";
import Category from "@/models/Category";
import Product from "@/models/Product";

type CategoryDoc = { _id: string; name: string; slug: string; image?: string };

export const runtime = "nodejs";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params; // ⬅️ Next 15 requires await
  await dbConnect();

  const cat = await Category.findOne({ slug: category }).lean<CategoryDoc | null>();
  if (!cat) {
    return <div className="max-w-6xl mx-auto p-6">No category.</div>;
  }

  // Pull products in this category and build a sample card per subcategory
  const products = await Product.find(
    {
      $or: [{ categorySlug: cat.slug }, { categoryId: cat._id }],
    },
    { subcategorySlug: 1, subcategoryName: 1, image: 1 }
  ).lean();

  const map = new Map<string, { title: string; img: string | null }>();
  for (const p of products as any[]) {
    const subSlug = p.subcategorySlug || p.subcategory || "";
    if (!subSlug) continue;
    if (!map.has(subSlug)) {
      map.set(subSlug, {
        title: p.subcategoryName || subSlug,
        img: p.image || null,
      });
    }
  }

  const samples = Array.from(map.entries()).map(([sub, v]) => ({
    sub,
    title: v.title,
    img: v.img,
  }));

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">{cat.name}</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-7">
        {samples.map((s) => (
          <Link
            href={`/${cat.slug}/${s.sub}`}
            key={s.sub}
            className="group block rounded-xl overflow-hidden shadow hover:shadow-xl transition bg-white border border-gray-100"
          >
            <img
              src={s.img || "/placeholder.png"}
              alt={s.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-blue-900 group-hover:text-orange-500 capitalize">
                {s.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
