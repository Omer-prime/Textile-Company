export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoose";
import Category from "@/models/Category";
import { CategoryUpdateSchema } from "@/lib/validators/category";
import { slugify } from "@/lib/slug";

// GET /api/categories/:id
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const item = await Category.findById(params.id).lean();
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

// PUT /api/categories/:id
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const body = await req.json();
    const data = CategoryUpdateSchema.parse(body);
    const nextSlug = data.slug?.trim() || (data.name ? slugify(data.name) : undefined);

    const updated = await Category.findByIdAndUpdate(
      params.id,
      {
        ...(data.name ? { name: data.name } : {}),
        ...(nextSlug ? { slug: nextSlug } : {}),
        ...(data.description !== undefined ? { description: data.description } : {}),
        ...(data.image !== undefined ? { image: data.image } : {}),
      },
      { new: true, runValidators: true }
    ).lean();

    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

// DELETE /api/categories/:id
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const deleted = await Category.findByIdAndDelete(params.id).lean();
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
