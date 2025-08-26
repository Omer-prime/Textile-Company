import { dbConnect } from "@/lib/mongoose";
import Product from "@/models/Product";
import Category from "@/models/Category";
import Testimonial from "@/models/Testimonial";
import User from "@/models/User";

export const runtime = "nodejs";

export default async function AdminDashboard() {
  await dbConnect();
  const [productCount, categoryCount, testimonialCount, userCount] =
    await Promise.all([
      Product.countDocuments(),
      Category.countDocuments(),
      Testimonial.countDocuments(),
      User.countDocuments(),
    ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-blue-900">Dashboard</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card title="Products" value={productCount} />
        <Card title="Categories" value={categoryCount} />
        <Card title="Testimonials" value={testimonialCount} />
        <Card title="Users" value={userCount} />
      </div>

      <div className="rounded-xl border bg-white p-5">
        <h2 className="text-lg font-semibold mb-2">Quick links</h2>
        <ul className="list-disc pl-5 space-y-1 text-blue-700">
          <li><a className="hover:underline" href="/admin/products/new">Add Product</a></li>
          <li><a className="hover:underline" href="/admin/categories/new">Add Category</a></li>
          <li><a className="hover:underline" href="/admin/testimonials/new">Add Testimonial</a></li>
        </ul>
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-bold text-blue-900">{value}</div>
    </div>
  );
}
