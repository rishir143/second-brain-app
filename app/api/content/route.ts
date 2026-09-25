// app/api/content/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-123";

async function getUserIdFromToken() {
  const cookieStore = await cookies(); // Note: 'await' required in Next.js 15+
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return decoded.userId;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const userId = await getUserIdFromToken();

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized. Please log in." },
        { status: 401 },
      );
    }

    const { title, link, type } = await request.json();

    if (!title || !type) {
      return NextResponse.json(
        { message: "Title and Type are required" },
        { status: 400 },
      );
    }

    // Check if the user actually exists in DB before inserting
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      return NextResponse.json(
        { message: "Invalid user session. Please log out and sign in again." },
        { status: 400 },
      );
    }

    const newContent = await prisma.content.create({
      data: {
        title,
        link: link || null,
        type,
        userId,
      },
    });

    return NextResponse.json(
      { message: "Content added successfully", content: newContent },
      { status: 201 },
    );
  } catch (error) {
    console.error("Prisma Insert Error:", error);
    return NextResponse.json(
      { message: "Failed to save content", error: String(error) },
      { status: 500 },
    );
  }
}
