// src/lib/auth.ts
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { dbConnect } from "./mongoose";
import User from "@/models/User";

/** Use NEXTAUTH_SECRET (preferred) or fallback to AUTH_SECRET */
const JWT_SECRET =
  process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET || "change-me";

/* =======================
   NextAuth configuration
   ======================= */
export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  secret: JWT_SECRET,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(creds) {
        const email = creds?.email?.toString().trim();
        const password = creds?.password?.toString() || "";
        if (!email || !password) return null;

        await dbConnect();
        const user = await User.findOne({ email }).lean<{
          _id: any;
          email: string;
          password: string;
          role?: string;
          name?: string;
        } | null>();
        if (!user) return null;

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return null;

        return {
          id: String(user._id),
          email: user.email,
          name: user.name ?? "Admin",
          role: user.role ?? "USER",
        } as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = (user as any).id ?? token.sub;
        token.role = (user as any).role ?? "USER";
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).role = token.role;
      if (session.user) (session.user as any).id = token.sub;
      return session;
    },
  },
  pages: { signIn: "/admin/login" },
};

/* =======================
   Custom Admin JWT helpers
   ======================= */
/** Read admin token from Authorization: Bearer <token> OR cookie: admin_token */
export async function verifyAdmin(req: Request) {
  let token: string | null = null;

  // Bearer
  const auth = req.headers.get("authorization") || "";
  if (auth.toLowerCase().startsWith("bearer ")) token = auth.slice(7);

  // Cookie fallback
  if (!token) {
    const cookie = req.headers.get("cookie") || "";
    const m = cookie.match(/(?:^|;\s*)admin_token=([^;]+)/i);
    if (m) token = decodeURIComponent(m[1]);
  }

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return decoded?.role === "ADMIN" ? decoded : null;
  } catch {
    return null;
  }
}

/** Validate credentials, return a signed admin JWT (7d) or null */
export async function loginAdmin(email: string, password: string) {
  await dbConnect();
  const user = await User.findOne({ email }).lean<{
    _id: any;
    email: string;
    password: string;
    role?: "ADMIN" | "USER";
    name?: string;
  } | null>();

  if (!user || (user.role ?? "USER") !== "ADMIN") return null;

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return null;

  const payload = {
    sub: String(user._id),
    role: "ADMIN",
    email: user.email,
    name: user.name ?? "Admin",
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}
