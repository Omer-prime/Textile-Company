// src/app/api/admin/products/route.ts
import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/auth";
import { dbConnect } from "@/lib/mongoose";
import Product from "@/models/Product";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const admin = await verifyAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  const products = await Product.find({}).select("_id name slug").lean();
  return NextResponse.json({ products });
}
