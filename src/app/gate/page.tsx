"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GatePage() {
  const [pass, setPass] = useState("");
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/gate", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // IMPORTANT
      body: JSON.stringify({ pass }),
      credentials: "include", // ensures cookie is persisted in some environments
    });
    if (res.ok) {
      router.push("/");       // or window.location.href = "/";
    } else {
      alert("Wrong password");
    }
  };

  return (
    <div className="max-w-sm mx-auto py-20 px-4">
      <h1 className="text-2xl font-bold mb-4">Enter Site Password</h1>
      <form onSubmit={submit} className="space-y-3">
        <input
          type="password"
          className="w-full border rounded px-3 py-2"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Site password"
        />
        <button className="w-full bg-blue-600 text-white px-3 py-2 rounded">
          Enter
        </button>
      </form>
    </div>
  );
}
