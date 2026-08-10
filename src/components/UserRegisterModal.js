// src/components/UserRegisterModal.js
"use client";
import { useState } from "react";

export default function UserRegisterModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      
      if (res.ok) {
        setMessage("সফলভাবে একাউন্ট তৈরি হয়েছে!");
        
        setTimeout(() => {
          if (onClose) onClose();
        }, 3000); 
      } else {
        setMessage(data.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে।");
      }
    } catch (error) {
      setMessage("সার্ভার এরর, আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
      <div className="bg-[#181818] border border-gray-800 p-8 rounded-lg max-w-sm w-full relative">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Man/User Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-[#222222] p-4 rounded-full border border-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
        
        {/* Text Area (Centered) */}
        <div className="text-center mb-6">
          <h2 className="text-white text-2xl font-bold mb-2">Sign Up</h2>
          <p className="text-gray-400 text-sm">
            লাভ স্টোরি ড্রামার সম্পূর্ণ এপিসোড দেখতে আপনার ইমেইল এবং পাসওয়ার্ড দিয়ে একটি নতুন একাউন্ট তৈরি করুন।
          </p>
        </div>
        
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            required
            className="bg-[#333333] text-white border border-transparent focus:border-red-600 p-3 rounded outline-none transition-colors"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="bg-[#333333] text-white border border-transparent focus:border-red-600 p-3 rounded outline-none transition-colors"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
            type="submit" 
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white p-3 rounded font-bold transition-colors mt-2 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Sign Up"}
          </button>
        </form>

        {/* Success or Error Message */}
        {message && (
          <p className={`mt-4 text-sm text-center ${message.includes("সফলভাবে") ? "text-green-500" : "text-red-500"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}