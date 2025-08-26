"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [cats, setCats] = useState<any[]>([]);
  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;

  async function loadCats() {
    const res = await fetch("/api/admin/categories");
    setCats(await res.json());
  }
  useEffect(() => { loadCats(); }, []);

  async function addCategory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd) as any;
    const res = await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return alert("Failed");
    await loadCats(); e.currentTarget.reset();
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* Categories */}
      <section className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-3">Add Category</h2>
        <form onSubmit={addCategory} className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input name="name" className="border rounded px-3 py-2" placeholder="Name" required />
          <input name="slug" className="border rounded px-3 py-2" placeholder="Slug" required />
          <input name="image" className="border rounded px-3 py-2" placeholder="Image URL" />
          <input name="description" className="border rounded px-3 py-2 md:col-span-2" placeholder="Description" />
          <button className="bg-blue-600 text-white rounded px-4 py-2 md:col-span-2">Save</button>
        </form>
        <ul className="mt-4 text-sm">
          {cats.map((c) => <li key={c._id}>• {c.name} ({c.slug})</li>)}
        </ul>
      </section>

      {/* Repeat: Products form, Features form, Testimonials form, Featured (productIds) form */}
    </div>
  );
}
