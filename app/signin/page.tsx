// app/signin/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      alert("Logged in successfully!");
      router.push("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSignin} className="flex flex-col gap-4 w-80 p-6 border rounded">
        <h2 className="text-xl font-bold">Sign In</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded text-black"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded text-black"
          required
        />
        <button type="submit" className="bg-green-600 text-white p-2 rounded">
          Sign In
        </button>
      </form>
    </div>
  );
}