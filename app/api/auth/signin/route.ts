// app/api/auth/signin/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-123";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 403 });
    }

    // Password verification
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 403 },
      );
    }

    // JWT Token generate karna
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    const response = NextResponse.json({
      message: "Logged in successfully",
      token,
    });

    // Cookie mein save karna taaki client secure rahe
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ message: "Error signing in" }, { status: 500 });
  }
}
