// src/app/(root)/search/page.tsx
import { dbConnect } from "@/lib/mongoose";
import Product from "@/models/Product";

type ProductCard = { _id: string; name: string; slug: string; image?: string };

export const runtime = "nodejs";

interface SearchResultsProps {
  searchParams: { q?: string };
}

export default async function SearchResults({ searchParams }: SearchResultsProps) {
  await dbConnect();

  const q = (searchParams.q || "").trim();

  // 1) Fetch with lean
  const raw = q
    ? await Product.find(
        { name: { $regex: q, $options: "i" } },
        { name: 1, slug: 1, image: 1 }
      )
        .limit(30)
        .lean()
    : [];

  // 2) Normalize into your typed shape
  const results: ProductCard[] = raw.map((doc: any) => ({
    _id: String(doc._id),
    name: doc.name as string,
    slug: doc.slug as string,
    image: doc.image as string | undefined,
  }));

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">
        Search Results for &quot;{q}&quot;
      </h1>

      {!results.length && (
        <div className="text-gray-500">No products found.</div>
      )}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-7">
        {results.map((prod) => (
          <div
            key={prod._id}
            className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow hover:shadow-lg transition"
          >
            <img
              src={prod.image || "/placeholder.png"}
              alt={prod.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 font-medium text-blue-900">{prod.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
