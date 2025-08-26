import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoose";
import Category from "@/models/Category";
import { z } from "zod";

export const runtime = "nodejs";

export async function GET() {
  await dbConnect();
  const items = await Category.find().sort({ name: 1 }).lean();
  return NextResponse.json(items);
}

const catZ = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
});

export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = catZ.parse(await req.json());
    const created = await Category.create(body);
    return NextResponse.json(created, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
