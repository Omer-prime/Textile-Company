export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoose";
import Testimonial from "@/models/Testimonial";

// If you already have this schema in "@/lib/validators/testimonial", keep your import.
// Otherwise uncomment the inline Zod schema below.
// import { TestimonialUpdateSchema } from "@/lib/validators/testimonial";

import { z } from "zod";
const TestimonialUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  avatar: z.string().url().optional(),
  rating: z.number().min(1).max(5).optional(),
  review: z.string().min(1).optional(),
});

// GET /api/testimonials/:id
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const item = await Testimonial.findById(params.id).lean();
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

// PUT /api/testimonials/:id
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const body = await req.json();
    const data = TestimonialUpdateSchema.parse(body);

    const updated = await Testimonial.findByIdAndUpdate(
      params.id,
      { $set: data },
      { new: true, runValidators: true }
    ).lean();

    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

// DELETE /api/testimonials/:id
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const deleted = await Testimonial.findByIdAndDelete(params.id).lean();
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
