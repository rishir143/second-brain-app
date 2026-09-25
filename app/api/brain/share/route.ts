// app/api/brain/share/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import crypto from "crypto";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-123";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
  const { share } = await request.json(); // boolean: true (enable share) or false (disable share)

  if (share) {
    // Check if share link already exists
    const existingLink = await prisma.link.findUnique({
      where: { userId: decoded.userId },
    });

    if (existingLink) {
      return NextResponse.json({ hash: existingLink.hash });
    }

    // Unique random hash generation
    const hash = crypto.randomBytes(10).toString("hex");

    await prisma.link.create({
      data: {
        userId: decoded.userId,
        hash,
      },
    });

    return NextResponse.json({ hash });
  } else {
    // Sharing turned off
    await prisma.link.deleteMany({
      where: { userId: decoded.userId },
    });

    return NextResponse.json({ message: "Share link disabled" });
  }
}
