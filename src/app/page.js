// src/app/page.js
import HomeContent from "@/components/HomeContent";

// --- ডাইনামিক মেটা ট্যাগ জেনারেট করা হচ্ছে ---
export async function generateMetadata({ searchParams }) {
  const dramaId = searchParams?.drama;
  
  // ডিফল্ট ডাটা (যদি কেউ শুধু মেইন লিংক শেয়ার করে)
  let title = "Love Story Drama";
  let description = "সেরা কোরিয়ান লাভ স্টোরি ড্রামা, সম্পূর্ণ এপিসোড এখনই উপভোগ করুন";
  let imageUrl = "https://lovestorydrama.vercel.app/heroimg.jpg"; 

  // যদি নির্দিষ্ট কোনো ড্রামা শেয়ার করা হয় (?drama=1, 2, 3...)
  if (dramaId) {
    const dramaCards = [
      { id: "1", image: "/hq720.jpg", title: "Korean Drama 1" },
      { id: "2", image: "/images (2).jpg", title: "Korean Drama 2" },
      { id: "3", image: "/maxresdefault.jpg", title: "Korean Drama 3" },
      { id: "4", image: "/hq720 (1).jpg", title: "Korean Drama 4" },
    ];
    
    const selectedDrama = dramaCards.find(d => d.id === dramaId);
    if (selectedDrama) {
      title = selectedDrama.title;
      imageUrl = `https://lovestorydrama.vercel.app${selectedDrama.image}`; 
    }
  }

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: 'https://lovestorydrama.vercel.app',
      siteName: 'Love Story Drama',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'website',
    },
  };
}

// --- মূল হোমপেজ রেন্ডার ---
export default function Home() {
  return <HomeContent />;
}