export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoose";
import { ResetSchema } from "@/lib/validators/auth";
import { sha256 } from "@/lib/crypto";
import bcrypt from "bcrypt";
import User from "@/models/User";
import PasswordResetToken from "@/models/PasswordResetToken";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    const { token, password } = ResetSchema.parse(body);

    const tokenHash = sha256(token);
    const record = await PasswordResetToken.findOne({
      tokenHash,
      used: false,
      expiresAt: { $gt: new Date() },
    }).lean();

    if (!record) {
      return NextResponse.json({ error: "Invalid/expired token" }, { status: 400 });
    }

    const passHash = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(record.userId, { $set: { password: passHash } });

    await PasswordResetToken.findByIdAndUpdate(record._id, { $set: { used: true } });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
