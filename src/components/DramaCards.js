// src/components/DramaCards.js
"use client";
import Image from "next/image";

export default function DramaCards({ onWatchClick }) {
  const dramaCards = [
    { id: "1", image: "/drama1.jpg", title: "Korean Drama 1" },
    { id: "2", image: "/drama2.jpg", title: "Korean Drama 2" },
    { id: "3", image: "/drama3.jpg", title: "Korean Drama 3" },
    { id: "4", image: "/drama4.jpg", title: "Korean Drama 4" },
  ];

  const handleShare = async (e, card) => {
    e.stopPropagation(); 
    
    const shareUrl = `https://lovestorydrama.vercel.app/?drama=${card.id}`;
    
    const shareData = {
      title: 'Love Story Drama',
      text: `এই সেরা কোরিয়ান ড্রামাটি দেখুন: ${card.title}`,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('শেয়ার করা বাতিল হয়েছে বা এরর:', err);
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("ড্রামার লিংক কপি করা হয়েছে! এখন আপনি এটি পেস্ট করে শেয়ার করতে পারেন।");
    }
  };

  return (
    <section className="relative z-10 bg-[#121212] py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold text-white mb-8 border-l-4 border-red-600 pl-3">
          Trending Dramas
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dramaCards.map((card) => (
            <div key={card.id} className="bg-[#181818] rounded-lg overflow-hidden border border-gray-800 hover:border-gray-600 transition-colors group relative">
              
              <button
                onClick={(e) => handleShare(e, card)}
                className="absolute top-2 right-2 z-20 bg-black/60 hover:bg-red-600 text-white p-2 rounded-full backdrop-blur-sm transition-colors shadow-lg"
                title="Share this drama"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186j2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185j2.25 2.25 0 00-3.933 2.185z" />
                </svg>
              </button>

              <div 
                className="relative aspect-video cursor-pointer overflow-hidden"
                onClick={onWatchClick} 
              >
                <Image 
                  src={card.image} 
                  alt={`Drama Cover ${card.id}`} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* মোবাইলে ছোট (w-10 h-10) এবং ডেস্কটপে বড় (md:w-14 md:h-14) প্লে বাটন */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300 z-10">
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-red-600/90 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-8 md:h-8 text-white ml-0.5">
                      <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="p-4 relative z-10">
                <button 
                  onClick={onWatchClick} 
                  className="w-full flex items-center justify-center gap-2 bg-[#222222] hover:bg-red-600 text-gray-300 hover:text-white py-2.5 rounded font-medium transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                  </svg>
                  Watch Now
                </button>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}