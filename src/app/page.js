// src/app/page.js
import HomeContent from "@/components/HomeContent";

export const dynamic = "force-dynamic";

export async function generateMetadata({ searchParams }) {
  const dramaId = searchParams?.drama;
  
  let title = "Love Story Drama";
  let description = "সেরা কোরিয়ান লাভ স্টোরি ড্রামা, সম্পূর্ণ এপিসোড এখনই উপভোগ করুন";
  let imageUrl = "https://lovestorydrama.vercel.app/heroimg.jpg"; 
  let pageUrl = "https://lovestorydrama.vercel.app"; 

  if (dramaId) {
    const dramaCards = [
      { id: "1", image: "/drama1.jpg", title: "Korean Drama 1" },
      { id: "2", image: "/drama2.jpg", title: "Korean Drama 2" },
      { id: "3", image: "/drama3.jpg", title: "Korean Drama 3" },
      { id: "4", image: "/drama4.jpg", title: "Korean Drama 4" },
    ];
    
    const selectedDrama = dramaCards.find(d => d.id === dramaId);
    if (selectedDrama) {
      title = selectedDrama.title;
      imageUrl = `https://lovestorydrama.vercel.app${selectedDrama.image}`; 
      pageUrl = `https://lovestorydrama.vercel.app/?drama=${dramaId}`; 
    }
  }

  return {
    metadataBase: new URL('https://lovestorydrama.vercel.app'),
    title: title,
    description: description,
    // ফেসবুককে নির্দিষ্ট লিংক বোঝানোর জন্য Canonical URL যুক্ত করা হলো
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: title,
      description: description,
      url: pageUrl,
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

export default function Home() {
  return <HomeContent />;
}