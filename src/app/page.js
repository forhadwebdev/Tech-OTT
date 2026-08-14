// src/app/page.js
import HomeContent from "@/components/HomeContent";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// ডাইনামিক মেটা ট্যাগ জেনারেট করার ফাংশন (Social Media Sharing এর জন্য)
export async function generateMetadata({ searchParams }) {
  const dramaId = searchParams?.drama;

  // ডিফল্ট মেটা ডেটা (যদি কেউ কোনো নির্দিষ্ট ড্রামা ছাড়া শুধু মেইন ওয়েবসাইটের লিংক শেয়ার করে)
  let title = "Love Story Drama | সেরা কোরিয়ান লাভ স্টোরি";
  let description = "সেরা কোরিয়ান লাভ স্টোরি ড্রামা, সম্পূর্ণ এপিসোড এখনই উপভোগ করুন";
  let imageUrl = "https://lovestorydrama.vercel.app/heroimg.jpg"; // আপনার ডিফল্ট ব্যাকগ্রাউন্ড ছবি

  // যদি লিংকে ?drama=... থাকে, তবে ডাটাবেস থেকে সেই ড্রামার ছবি ও টাইটেল আনবে
  if (dramaId) {
    try {
      const client = await clientPromise;
      const db = client.db();
      
      // ডাটাবেস থেকে নির্দিষ্ট ড্রামাটি খোঁজা
      const drama = await db.collection("dramas").findOne({ _id: new ObjectId(dramaId) });

      if (drama) {
        title = `${drama.title} | Love Story Drama`;
        imageUrl = drama.image; // ক্লাউডিনারি থেকে আসা ড্রামার ছবি
      }
    } catch (error) {
      console.error("Error fetching metadata for sharing:", error);
    }
  }

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [imageUrl],
    },
  };
}

export default function HomePage() {
  return (
    <main>
      <HomeContent />
    </main>
  );
}