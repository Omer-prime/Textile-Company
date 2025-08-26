// src/app/admin/categories/page.tsx
import { dbConnect } from "@/lib/mongoose";
import Category from "@/models/Category";
import Link from "next/link";

export const runtime = "nodejs";

type Row = { _id: string; name: string; slug: string };

export default async function AdminCategories() {
  await dbConnect();
  const rows = await Category.find({}, { name: 1, slug: 1 })
    .sort({ createdAt: -1 })
    .lean<Row[]>();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-blue-900">Categories</h1>
        <Link href="/admin/categories/new" className="rounded-lg bg-blue-600 text-white px-4 py-2 hover:bg-blue-700">
          Add Category
        </Link>
      </div>

      {!rows.length ? (
        <div className="text-gray-500">No categories.</div>
      ) : (
        <div className="rounded-xl border bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Slug</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r._id} className="border-b last:border-0">
                  <td className="p-3">{r.name}</td>
                  <td className="p-3">{r.slug}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
