// src/app/page.js
import HomeContent from "@/components/HomeContent";

// পেজটিকে ডাইনামিক করার জন্য এই লাইনটি খুব জরুরি, যাতে প্রতিবার লিংকের আইডি অনুযায়ী ডাটা চেঞ্জ হয়
export const dynamic = "force-dynamic";

export async function generateMetadata({ searchParams }) {
  const dramaId = searchParams?.drama;
  
  let title = "Love Story Drama";
  let description = "সেরা কোরিয়ান লাভ স্টোরি ড্রামা, সম্পূর্ণ এপিসোড এখনই উপভোগ করুন";
  let imageUrl = "https://lovestorydrama.vercel.app/heroimg.jpg"; 
  let pageUrl = "https://lovestorydrama.vercel.app"; 

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
      pageUrl = `https://lovestorydrama.vercel.app/?drama=${dramaId}`; 
    }
  }

  return {
    metadataBase: new URL('https://lovestorydrama.vercel.app'),
    title: title,
    description: description,
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