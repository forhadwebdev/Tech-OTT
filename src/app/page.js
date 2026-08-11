// src/app/page.js
import HomeContent from "@/components/HomeContent";

export const dynamic = "force-dynamic";

export async function generateMetadata({ searchParams }) {
  const resolvedParams = await searchParams;
  const dramaId = resolvedParams?.drama;
  
  // ডিফল্ট টাইটেলেই বাংলা যুক্ত করা হলো
  let title = "Love Story Drama | সেরা কোরিয়ান লাভ স্টোরি";
  let description = "সম্পূর্ণ এপিসোড এখনই উপভোগ করুন";
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
      // ডাইনামিক টাইটেলেও বাংলা যুক্ত করা হলো
      title = `${selectedDrama.title} | সেরা কোরিয়ান লাভ স্টোরি`;
      description = `সম্পূর্ণ এপিসোড এখনই উপভোগ করুন`;
      imageUrl = `https://lovestorydrama.vercel.app${selectedDrama.image}`; 
      pageUrl = `https://lovestorydrama.vercel.app/?drama=${dramaId}`; 
    }
  }

  return {
    metadataBase: new URL('https://lovestorydrama.vercel.app'),
    title: title,
    description: description,
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