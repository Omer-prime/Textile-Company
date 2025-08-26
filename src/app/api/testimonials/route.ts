import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoose";
import Testimonial from "@/models/Testimonial";
import { z } from "zod";

export const runtime = "nodejs";

export async function GET() {
  await dbConnect();
  const items = await Testimonial.find().sort({ createdAt: -1 }).limit(12).lean();
  return NextResponse.json(items);
}

const tZ = z.object({
  name: z.string(),
  rating: z.number().min(1).max(5),
  review: z.string(),
  avatar: z.string().optional(),
});

export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = tZ.parse(await req.json());
    const created = await Testimonial.create(body);
    return NextResponse.json(created, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
