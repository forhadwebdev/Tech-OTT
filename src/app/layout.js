import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Hind_Siliguri } from "next/font/google";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bengali",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// রুট মেটাডাটাকে স্ট্রং করা হলো (OG ট্যাগ সহ)
export const metadata = {
  metadataBase: new URL("https://lovestorydrama.vercel.app"),
  title: "Love Story Drama | সেরা কোরিয়ান লাভ স্টোরি",
  description: "সেরা কোরিয়ান লাভ স্টোরি ড্রামা, সম্পূর্ণ এপিসোড এখনই উপভোগ করুন",
  openGraph: {
    title: "Love Story Drama | সেরা কোরিয়ান লাভ স্টোরি",
    description: "সেরা কোরিয়ান লাভ স্টোরি ড্রামা, সম্পূর্ণ এপিসোড এখনই উপভোগ করুন",
    url: "https://lovestorydrama.vercel.app",
    siteName: "Love Story Drama",
    images: [
      {
        url: "/heroimg.jpg", // ডিফল্ট ছবি
        width: 1200,
        height: 630,
        alt: "Love Story Drama",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${hindSiliguri.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>{children}</body>
    </html>
  );
}