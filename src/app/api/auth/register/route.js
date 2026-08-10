// src/app/api/auth/register/route.js
import { NextResponse } from "next/server";

// import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb"; // আপনার আগের তৈরি করা mongodb কানেকশন ফাইল

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    // MongoDB কানেকশন
    const client = await clientPromise;
    const db = client.db("tech_db");
    const usersCollection = db.collection("users");

    // ইউজার আগে থেকেই আছে কিনা চেক করা
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    // পাসওয়ার্ড হ্যাশ করা (Salt Rounds = 10)
    // const hashedPassword = await bcrypt.hash(password, 10);
    const hashedPassword = password;

    // ডাটাবেসে সেভ করা
    const result = await usersCollection.insertOne({
      email: email,
      password: hashedPassword, // হ্যাশ করা পাসওয়ার্ড সেভ হচ্ছে
      createdAt: new Date(),
    });

    return NextResponse.json({ 
      success: true, 
      message: "Registration successful!",
      userId: result.insertedId 
    }, { status: 201 });

  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}