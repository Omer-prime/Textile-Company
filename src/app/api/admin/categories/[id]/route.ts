import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoose";
import { verifyAdmin } from "@/lib/auth";
import Category from "@/models/Category";
import { CategorySchema } from "@/lib/zod";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const item = await Category.findById(params.id).lean();
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const admin = await verifyAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await dbConnect();
  const payload = await req.json();
  const data = CategorySchema.partial().parse(payload);
  const updated = await Category.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const admin = await verifyAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await dbConnect();
  await Category.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}
