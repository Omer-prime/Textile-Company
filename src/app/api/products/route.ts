import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoose";
import Product from "@/models/Product";
import { z } from "zod";

export const runtime = "nodejs";

// GET /api/products?q=&categorySlug=&subcategory=&limit=
export async function GET(req: Request) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const categorySlug = searchParams.get("categorySlug") || "";
  const subcategory = searchParams.get("subcategory") || "";
  const limit = Math.min(parseInt(searchParams.get("limit") || "36", 10), 100);

  const filter: any = {};
  if (q) filter.name = { $regex: q, $options: "i" };
  if (categorySlug) filter.categorySlug = categorySlug;
  if (subcategory) filter.subcategory = subcategory;

  const items = await Product.find(filter)
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  return NextResponse.json(items);
}

const imageZ = z.object({
  url: z.string().url(),
  alt: z.string().optional(),
  sortOrder: z.number().optional(),
});

const variantZ = z.object({
  colorName: z.string(),
  colorHex: z.string(),
  images: z.array(imageZ).optional(),
});

const bodyZ = z.object({
  name: z.string(),
  slug: z.string().optional(),
  description: z.string().optional(),
  categorySlug: z.string(),
  subcategory: z.string().optional(),
  sizes: z.array(z.string()).optional(),
  variants: z.array(variantZ).optional(),
  image: z.string().optional(),
});

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function POST(req: Request) {
  await dbConnect();
  try {
    const parsed = bodyZ.parse(await req.json());
    const slug = parsed.slug || slugify(parsed.name);

    const created = await Product.create({
      ...parsed,
      slug,
      variants:
        parsed.variants?.map((v) => ({
          ...v,
          colorHex: v.colorHex.startsWith("#") ? v.colorHex : `#${v.colorHex}`,
          images: v.images || [],
        })) || [],
      sizes: parsed.sizes || [],
    });

    return NextResponse.json(created, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
