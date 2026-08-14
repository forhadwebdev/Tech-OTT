// src/app/page.js
import HomeContent from "@/components/HomeContent";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const dramaId = params?.drama;

  const baseUrl = "https://lovestorydrama.vercel.app";
  let title = "Love Story Drama | সেরা কোরিয়ান লাভ স্টোরি";
  let description = "সেরা কোরিয়ান লাভ স্টোরি ড্রামা, সম্পূর্ণ এপিসোড এখনই উপভোগ করুন";
  let imageUrl = `${baseUrl}/heroimg.jpg`; 

  if (dramaId && ObjectId.isValid(dramaId)) {
    try {
      const client = await clientPromise;
      const db = client.db();
      
      const drama = await db.collection("dramas").findOne({ _id: new ObjectId(dramaId) });

      if (drama && drama.image) {
        title = `${drama.title} | Love Story Drama`;
        imageUrl = drama.image; 
      }
    } catch (error) {
      console.error("Error fetching metadata for sharing:", error);
    }
  }

  return {
    metadataBase: new URL(baseUrl), // এটি যুক্ত করা হলো
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: dramaId ? `${baseUrl}/?drama=${dramaId}` : baseUrl,
      type: "website", // ফেসবুকের জন্য এটি জরুরি
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