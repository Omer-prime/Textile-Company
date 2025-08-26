import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoose";
import Product from "@/models/Product";
import { z } from "zod";

export const runtime = "nodejs";

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  await dbConnect();
  const item = await Product.findOne({ slug: params.slug }).lean();
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

const updateZ = z.object({
  name: z.string().optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
  categorySlug: z.string().optional(),
  subcategory: z.string().optional(),
  sizes: z.array(z.string()).optional(),
  variants: z
    .array(
      z.object({
        colorName: z.string(),
        colorHex: z.string(),
        images: z
          .array(
            z.object({
              url: z.string().url(),
              alt: z.string().optional(),
              sortOrder: z.number().optional(),
            })
          )
          .optional(),
      })
    )
    .optional(),
  image: z.string().optional(),
});

export async function PUT(req: Request, { params }: { params: { slug: string } }) {
  await dbConnect();
  try {
    const body = updateZ.parse(await req.json());
    if (body.variants) {
      body.variants = body.variants.map((v) => ({
        ...v,
        colorHex: v.colorHex.startsWith("#") ? v.colorHex : `#${v.colorHex}`,
        images: v.images || [],
      }));
    }
    const updated = await Product.findOneAndUpdate({ slug: params.slug }, body, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { slug: string } }) {
  await dbConnect();
  const deleted = await Product.findOneAndDelete({ slug: params.slug }).lean();
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
