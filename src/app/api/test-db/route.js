import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    // ডাটাবেস কানেকশন কল করা
    const client = await clientPromise;
    const db = client.db("tech_db");

    // MongoDB-কে একটি "ping" কমান্ড পাঠানো
    await db.command({ ping: 1 });

    return NextResponse.json({ 
      success: true, 
      message: "MongoDB Database Connection Successful! 🎉" 
    }, { status: 200 });

  } catch (error) {
    console.error("Database Connection Failed:", error);
    return NextResponse.json({ 
      success: false, 
      message: "Failed to connect to Database.",
      error: error.message
    }, { status: 500 });
  }
}
