// src/components/DeleteUserButton.js
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteUserButton({ userId }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("আপনি কি নিশ্চিত যে এই ইউজারকে ডিলিট করতে চান?");
    if (!confirmDelete) return;

    setIsDeleting(true);
    
    try {
      // এখানে সরাসরি ?id= ব্যবহার করে API কল করা হচ্ছে
      const res = await fetch(`/api/users?id=${userId}`, {
        method: "DELETE",
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        router.refresh(); // ডিলিট সফল হলে ড্যাশবোর্ড রিফ্রেশ হবে
      } else {
        alert(data.message || "ডিলিট করতে সমস্যা হয়েছে।");
      }
    } catch (error) {
      alert("সার্ভার এরর! আবার চেষ্টা করুন।");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="bg-red-900/50 hover:bg-red-600 border border-red-800 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}