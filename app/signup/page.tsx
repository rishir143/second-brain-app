// app/signup/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Signup successful! Now sign in.");
      router.push("/signin");
    } else {
      alert(data.message || "Signup failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSignup} className="flex flex-col gap-4 w-80 p-6 border rounded">
        <h2 className="text-xl font-bold">Sign Up</h2>
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
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
}