import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoose";
import { verifyAdmin } from "@/lib/auth";
import Category from "@/models/Category";
import { CategorySchema } from "@/lib/zod";

export async function GET() {
  await dbConnect();
  const items = await Category.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const admin = await verifyAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await dbConnect();
  const data = CategorySchema.parse(await req.json());
  const created = await Category.create(data);
  return NextResponse.json(created);
}
