// app/page.tsx
"use client"; // Kyunki hum form submit kar rahe hain (user interaction), yeh client component hoga

import { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [type, setType] = useState("note");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // API call to our Next.js backend
    const res = await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        link,
        type,
        userId: "demo-user-id-123", // Dummy ID for now
      }),
    });

    if (res.ok) {
      alert("Content saved to your Second Brain!");
      setTitle("");
      setLink("");
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Brainly-App: Second Brain</h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title (e.g., My thoughts on AI)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded text-black"
          required
        />
        
        <input
          type="url"
          placeholder="Link (Optional)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="border p-2 rounded text-black"
        />

        <select 
          value={type} 
          onChange={(e) => setType(e.target.value)}
          className="border p-2 rounded text-black"
        >
          <option value="note">Note</option>
          <option value="tweet">Tweet</option>
          <option value="article">Article</option>
          <option value="video">Video</option>
        </select>

        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Save Content
        </button>
      </form>
    </main>
  );
}