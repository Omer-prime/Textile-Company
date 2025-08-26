"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    categorySlug: "",
    subcategorySlug: "",
    image: "",
    colors: "",
    sizes: "",
    description: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        colors: form.colors.split(",").map((x) => x.trim()).filter(Boolean),
        sizes: form.sizes.split(",").map((x) => x.trim()).filter(Boolean),
      }),
    });

    setSaving(false);

    if (res.ok) router.replace("/admin/products");
    else alert("Failed to create product");
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-bold text-blue-900 mb-4">Add Product</h1>
      <form onSubmit={onSubmit} className="space-y-4 bg-white rounded-xl border p-5">
        <Row label="Name">
          <input name="name" value={form.name} onChange={onChange} className="input" required />
        </Row>
        <Row label="Slug">
          <input name="slug" value={form.slug} onChange={onChange} className="input" required />
        </Row>
        <Row label="Category Slug">
          <input name="categorySlug" value={form.categorySlug} onChange={onChange} className="input" required />
        </Row>
        <Row label="Subcategory Slug">
          <input name="subcategorySlug" value={form.subcategorySlug} onChange={onChange} className="input" />
        </Row>
        <Row label="Main Image URL">
          <input name="image" value={form.image} onChange={onChange} className="input" />
        </Row>
        <Row label="Colors (comma separated)">
          <input name="colors" value={form.colors} onChange={onChange} className="input" />
        </Row>
        <Row label="Sizes (comma separated)">
          <input name="sizes" value={form.sizes} onChange={onChange} className="input" />
        </Row>
        <Row label="Description">
          <textarea name="description" value={form.description} onChange={onChange} className="input min-h-[100px]" />
        </Row>

        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Create"}
        </button>
      </form>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      {children}
    </label>
  );
}

// Tailwind shortcut
// Add to globals.css if you want
// .input { @apply w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500; }
