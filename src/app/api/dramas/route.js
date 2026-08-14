// src/app/api/dramas/route.js
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import cloudinary from '@/lib/cloudinary';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const dramas = await db.collection('dramas').find({}).sort({ _id: -1 }).toArray();
    return NextResponse.json(dramas, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch dramas" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, image, publicId } = body;

    if (!title || !image) {
      return NextResponse.json({ error: "Title and image are required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    
    const result = await db.collection('dramas').insertOne({
      title,
      image,
      publicId,
      createdAt: new Date()
    });

    return NextResponse.json({ success: true, insertedId: result.insertedId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add drama" }, { status: 500 });
  }
}

// নতুন যুক্ত করা হলো: ড্রামা আপডেট (এডিট) করার জন্য
export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, title, image, publicId } = body;

    if (!id || !title) {
      return NextResponse.json({ error: "ID and Title are required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const updateData = { title };
    if (image && publicId) {
      updateData.image = image;
      updateData.publicId = publicId;
    }

    await db.collection('dramas').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    return NextResponse.json({ success: true, message: "Drama updated successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update drama" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id, publicId } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Drama ID is required" }, { status: 400 });
    }

    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }

    const client = await clientPromise;
    const db = client.db();

    await db.collection('dramas').deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true, message: "Drama deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete drama" }, { status: 500 });
  }
}