import { dbConnect } from "@/lib/mongoose";
import Product from "@/models/Product";
import Link from "next/link";

export const runtime = "nodejs";

type Row = { _id: string; name: string; slug: string; categorySlug?: string; subcategorySlug?: string };

export default async function AdminProducts() {
  await dbConnect();
  const rows = await Product.find({}, { name: 1, slug: 1, categorySlug: 1, subcategorySlug: 1 })
    .sort({ createdAt: -1 })
    .limit(100)
    .lean<Row[]>();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-blue-900">Products</h1>
        <Link href="/admin/products/new" className="rounded-lg bg-blue-600 text-white px-4 py-2 hover:bg-blue-700">
          Add Product
        </Link>
      </div>

      {!rows.length ? (
        <div className="text-gray-500">No products.</div>
      ) : (
        <div className="rounded-xl border bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Slug</th>
                <th className="text-left p-3">Category</th>
                <th className="text-left p-3">Subcategory</th>
                <th className="text-right p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r._id} className="border-b last:border-0">
                  <td className="p-3">{r.name}</td>
                  <td className="p-3">{r.slug}</td>
                  <td className="p-3">{r.categorySlug || "-"}</td>
                  <td className="p-3">{r.subcategorySlug || "-"}</td>
                  <td className="p-3 text-right">
                    <Link className="text-blue-600 hover:underline" href={`/admin/products/${r._id}`}>Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
