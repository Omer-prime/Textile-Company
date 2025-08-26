"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") ?? "/admin";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setSubmitting(false);

    if (res?.ok) {
      router.replace(callbackUrl); // auto-navigate to dashboard
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm bg-white border border-gray-100 rounded-xl shadow p-6 space-y-4"
      >
        <h1 className="text-xl font-semibold text-blue-900">Admin Login</h1>

        <label className="block text-sm">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            className="mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            required
          />
        </label>

        <label className="block text-sm">
          <span className="text-gray-700">Password</span>
          <input
            type="password"
            className="mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md p-2">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-blue-600 text-white font-medium py-2 hover:bg-blue-700 disabled:opacity-60"
        >
          {submitting ? "Signing in..." : "Sign in"}
        </button>

        <div className="text-right">
          <a
            href="/admin/forgot"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </a>
        </div>
      </form>
    </div>
  );
}
