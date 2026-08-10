"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

const handleAdminLogin = (e) => {
    e.preventDefault();
    setError("");

    if (email === "techlovestory@gmail.com" && password === "TechLS@10") {
      // লগইন সফল হলে ব্রাউজারকে মনে রাখতে বলা হচ্ছে
      localStorage.setItem("adminAuth", "true");
      router.push("/dashboard");
    } else {
      setError("ভুল ইমেইল বা পাসওয়ার্ড! আপনি কি আসলেই অ্যাডমিন?");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
      <div className="bg-[#121212] border border-red-900 p-8 rounded-lg max-w-sm w-full relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h2 className="text-white text-2xl font-bold mb-2">Admin Dashboard</h2>
        <p className="text-gray-400 text-sm mb-6">
          ইউজারদের ডাটা দেখতে অ্যাডমিন প্যানেলে লগইন করুন।
        </p>
        
        <form onSubmit={handleAdminLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Admin Email"
            required
            className="bg-[#222] text-white border border-transparent focus:border-red-600 p-3 rounded outline-none transition-colors"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Admin Password"
            required
            className="bg-[#222] text-white border border-transparent focus:border-red-600 p-3 rounded outline-none transition-colors"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
            type="submit" 
            className="bg-red-700 hover:bg-red-800 text-white p-3 rounded font-bold transition-colors mt-2"
          >
            Login to Dashboard
          </button>
        </form>

        {error && <p className="mt-4 text-sm text-center text-red-500">{error}</p>}
      </div>
    </div>
  );
}