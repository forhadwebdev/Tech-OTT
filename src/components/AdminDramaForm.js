"use client";
import { useState } from "react";

export default function AdminDramaForm({ onAdded }) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title) return alert("সব তথ্য পূরণ করুন!");
    
    setLoading(true);

    // ১. Cloudinary-তে ছবি আপলোড
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "bfl6f2ro");

    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData,
    });
    const imageData = await res.json();

    // ২. ডাটাবেসে টাইটেল ও ইমেজ URL সেভ করা
    await fetch("/api/dramas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        image: imageData.secure_url,
        publicId: imageData.public_id,
      }),
    });

    setLoading(false);
    alert("সফলভাবে ড্রামা যোগ করা হয়েছে!");
    onAdded(); // লিস্ট রিফ্রেশ করার জন্য
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-[#181818] rounded-lg border border-gray-800 space-y-4 text-white">
      <input type="text" placeholder="Drama Title" className="w-full p-3 bg-[#222222] rounded" onChange={(e) => setTitle(e.target.value)} />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} className="w-full" />
      <button type="submit" className="w-full bg-red-600 py-3 rounded" disabled={loading}>
        {loading ? "Uploading..." : "Add Drama"}
      </button>
    </form>
  );
}