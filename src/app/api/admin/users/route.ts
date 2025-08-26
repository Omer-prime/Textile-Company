import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/auth";
import { dbConnect } from "@/lib/mongoose";
import User from "@/models/User";
import bcrypt from "bcrypt";

export async function GET(req: Request) {
  const admin = await verifyAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  const users = await User.find({}, { email: 1, role: 1, name: 1, createdAt: 1 }).lean();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const admin = await verifyAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  const { email, password, name, role } = await req.json() as {
    email: string; password: string; name?: string; role?: "ADMIN" | "USER";
  };

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  const exists = await User.findOne({ email }).lean();
  if (exists) return NextResponse.json({ error: "Email already in use" }, { status: 400 });

  const hash = await bcrypt.hash(password, 10);
  const doc = await User.create({
    email,
    password: hash,
    name: name || "",
    role: role === "ADMIN" ? "ADMIN" : "USER", // only admin can set admin
  });

  return NextResponse.json({ _id: doc._id, email: doc.email, role: doc.role, name: doc.name });
}
