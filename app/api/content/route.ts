// app/api/content/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, link, type, userId } = body;

    // Prisma ka use karke database mein naya content create kar rahe hain
    const newContent = await prisma.content.create({
      data: {
        title,
        link,
        type,
        userId, // Abhi ke liye hum manual ID bhejenge, future mein authentication add karenge
      },
    });

    return NextResponse.json({ success: true, data: newContent });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 },
    );
  }
}
