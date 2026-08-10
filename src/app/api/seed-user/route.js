import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("tech_db");

    const existing = await db.collection("users").findOne({
      email: "techlovestory@gmail.com",
    });

    if (existing) {
      return NextResponse.json({
        success: true,
        message: "User already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash("TechLS@10", 10);

    await db.collection("users").insertOne({
      email: "techlovestory@gmail.com",
      password: hashedPassword,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: "User created successfully.",
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to seed user." },
      { status: 500 }
    );
  }
}