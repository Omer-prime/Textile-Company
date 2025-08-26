import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { pass } = await req.json();

  if (pass === process.env.SITE_PASS) {
    // set a cookie that middleware can read
    const res = NextResponse.json({ ok: true });
    res.cookies.set("site_access", "granted", {
      httpOnly: false,                  // middleware can read request cookies either way
      sameSite: "lax",                  // good default
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,         // 7 days
    });
    return res;
  }

  return NextResponse.json({ ok: false }, { status: 401 });
}
