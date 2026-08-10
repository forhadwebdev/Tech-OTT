// src/app/api/users/route.js
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export async function DELETE(request) {
  try {
    // URL থেকে ইউজারের ID সংগ্রহ করা হচ্ছে (?id=...)
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, message: "ID পাওয়া যায়নি" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("tech_db");

    // ডাটাবেস থেকে ডিলিট করা
    const result = await db.collection("users").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return NextResponse.json({ success: true, message: "ইউজার সফলভাবে ডিলিট হয়েছে" });
    } else {
      return NextResponse.json({ success: false, message: "ইউজার ডাটাবেসে পাওয়া যায়নি" }, { status: 404 });
    }
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ success: false, message: "সার্ভার এরর" }, { status: 500 });
  }
}