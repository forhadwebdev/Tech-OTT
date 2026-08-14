// src/app/page.js
import HomeContent from "@/components/HomeContent";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// এই একটি মাত্র লাইন আপনার বিল্ড ক্র্যাশ হওয়া বন্ধ করবে
export const dynamic = "force-dynamic";

export async function generateMetadata({ searchParams }) {
  const dramaId = searchParams?.drama;

  let title = "Love Story Drama | সেরা কোরিয়ান লাভ স্টোরি";
  let description = "সেরা কোরিয়ান লাভ স্টোরি ড্রামা, সম্পূর্ণ এপিসোড এখনই উপভোগ করুন";
  let imageUrl = "https://lovestorydrama.vercel.app/heroimg.jpg"; 

  if (dramaId) {
    try {
      const client = await clientPromise;
      const db = client.db();
      
      const drama = await db.collection("dramas").findOne({ _id: new ObjectId(dramaId) });

      if (drama) {
        title = `${drama.title} | Love Story Drama`;
        imageUrl = drama.image; 
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