export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoose";
import { ForgotSchema } from "@/lib/validators/auth";
import { randomToken, sha256 } from "@/lib/crypto";
import User from "@/models/User";
import PasswordResetToken from "@/models/PasswordResetToken";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    const { email } = ForgotSchema.parse(body);

    const user = await User.findOne({ email }).lean();
    if (!user) {
      // Do not reveal if user exists
      return NextResponse.json({ ok: true });
    }

    const token = randomToken(32);
    const tokenHash = sha256(token);
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await PasswordResetToken.create({
      userId: user._id,
      tokenHash,
      expiresAt,
      used: false,
    });

    const base = process.env.APP_URL || "http://localhost:3000";
    const link = `${base}/admin/reset?token=${encodeURIComponent(token)}`;
    // TODO: send email via provider; for now:
    console.log("Reset link:", link);

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
