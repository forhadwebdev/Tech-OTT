// src/components/HomeContent.js
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import UserRegisterModal from "@/components/UserRegisterModal";
import AdminLoginModal from "@/components/AdminLoginModal";
import DramaCards from "@/components/DramaCards";

export default function HomeContent() {
  const [showUserRegister, setShowUserRegister] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const router = useRouter();

  const handleAdminClick = () => {
    const isAdminLoggedIn = localStorage.getItem("adminAuth");
    if (isAdminLoggedIn === "true") {
      router.push("/dashboard");
    } else {
      setShowAdminLogin(true);
    }
  };

  return (
    <div className="bg-black min-h-screen w-full font-sans text-white">
      
      {/* ---------------- Hero Section ---------------- */}
      <div className="relative min-h-[90vh] w-full overflow-hidden flex flex-col">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-red-600 z-20" />

        <div className="absolute inset-0 z-0">
          <Image
            src="/heroimg.jpg"
            alt="Background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        </div>

        <header className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6">
          <h1 className="text-red-600 text-3xl md:text-4xl font-extrabold tracking-tight">
            Love Story Drama
          </h1>

          <button
            onClick={handleAdminClick}
            aria-label="Login"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        </header>

        <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 md:px-6 pb-20">
          <h2 className="text-white font-extrabold text-4xl sm:text-5xl md:text-6xl leading-tight max-w-3xl">
            সেরা কোরিয়ান লাভ স্টোরি ড্রামা, সম্পূর্ণ এপিসোড এখনই উপভোগ করুন
          </h2>

          <button 
            onClick={() => setShowUserRegister(true)}
            className="mt-6 flex items-center gap-2 bg-red-600 hover:bg-red-700 transition-colors text-white text-lg md:text-xl font-semibold px-6 py-3 rounded shadow-lg shadow-red-600/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
              <path d="M8 5v14l11-7z" />
            </svg>
            Watch Now
          </button>
        </main>

        <div className="absolute bottom-0 left-0 right-0 h-2 z-20">
          <svg viewBox="0 0 1440 20" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0,10 Q720,-10 1440,10 L1440,20 L0,20 Z" fill="#121212" />
          </svg>
        </div>
      </div>

      {/* ---------------- Video Cards Component ---------------- */}
      <DramaCards onWatchClick={() => setShowUserRegister(true)} />

      {/* ---------------- Modals ---------------- */}
      {showUserRegister && <UserRegisterModal onClose={() => setShowUserRegister(false)} />}
      {showAdminLogin && <AdminLoginModal onClose={() => setShowAdminLogin(false)} />}
    </div>
  );
}