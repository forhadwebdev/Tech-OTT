// src/components/ManageDramas.js
"use client";
import { useState, useEffect } from "react";
import AdminDramaForm from "@/components/AdminDramaForm";
import Image from "next/image";

export default function ManageDramas() {
  const [dramas, setDramas] = useState([]);
  
  // এডিট করার জন্য স্টেটগুলো
  const [editingDrama, setEditingDrama] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editFile, setEditFile] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchDramas = async () => {
    try {
      const res = await fetch("/api/dramas", { cache: "no-store" });
      const data = await res.json();
      setDramas(data);
    } catch (error) {
      console.error("Failed to fetch dramas:", error);
    }
  };

  useEffect(() => {
    fetchDramas();
  }, []);

  const handleDelete = async (id, publicId) => {
    if (!confirm("আপনি কি নিশ্চিত এই ড্রামাটি ডিলিট করতে চান?")) return;

    try {
      await fetch("/api/dramas", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, publicId }),
      });
      fetchDramas(); 
    } catch (error) {
      console.error("Failed to delete drama:", error);
    }
  };

  const handleEditClick = (drama) => {
    setEditingDrama(drama);
    setEditTitle(drama.title);
    setEditFile(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    let imageUrl = editingDrama.image;
    let pubId = editingDrama.publicId;

    try {
      // যদি নতুন ছবি সিলেক্ট করা হয়, তাহলে আগে সেটি আপলোড হবে
      if (editFile) {
        const formData = new FormData();
        formData.append("file", editFile);
        formData.append("upload_preset", "bfl6f2ro"); 

        const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: "POST",
          body: formData,
        });
        const imageData = await res.json();
        imageUrl = imageData.secure_url;
        pubId = imageData.public_id;
      }

      // ডাটাবেস আপডেট
      await fetch("/api/dramas", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingDrama._id, title: editTitle, image: imageUrl, publicId: pubId }),
      });

      setEditingDrama(null);
      fetchDramas();
    } catch (error) {
      console.error("Failed to update drama:", error);
      alert("আপডেট করতে সমস্যা হয়েছে!");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-10 relative">
      
      {/* বাম দিকে: নতুন ড্রামা যোগ করার ফর্ম */}
      <div className="w-full md:w-1/3">
        <h3 className="text-xl font-semibold mb-4 text-gray-200 border-l-4 border-red-600 pl-3">Add Drama</h3>
        <AdminDramaForm onAdded={fetchDramas} />
      </div>

      {/* ডান দিকে: আপলোড করা ড্রামার লিস্ট */}
      <div className="w-full md:w-2/3">
        <h3 className="text-xl font-semibold mb-4 text-gray-200 border-l-4 border-red-600 pl-3">Uploaded Dramas</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {dramas.length > 0 ? (
            dramas.map((drama) => (
              <div key={drama._id} className="bg-[#181818] rounded-lg overflow-hidden border border-gray-800 flex flex-col group shadow-lg">
                <div className="relative aspect-video w-full bg-[#222222]">
                  {drama.image && (
                    <Image 
                      src={drama.image} 
                      alt={drama.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  )}
                </div>
                <div className="p-4 flex flex-col flex-grow justify-between">
                  <p className="mb-5 text-gray-200 font-medium truncate text-lg" title={drama.title}>{drama.title}</p>
                  
                  {/* গোছানো বাটন সেকশন: Edit এবং Delete পাশাপাশি */}
                  <div className="flex gap-3 mt-auto">
                    <button 
                      onClick={() => handleEditClick(drama)}
                      className="flex-1 bg-[#222222] hover:bg-blue-600 border border-gray-700 hover:border-blue-600 text-gray-300 hover:text-white px-3 py-2.5 rounded text-sm font-medium transition-all flex items-center justify-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(drama._id, drama.publicId)}
                      className="flex-1 bg-[#222222] hover:bg-red-600 border border-gray-700 hover:border-red-600 text-gray-300 hover:text-white px-3 py-2.5 rounded text-sm font-medium transition-all flex items-center justify-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 bg-[#181818] p-6 rounded-lg border border-gray-800 col-span-full text-center">
              এখনো কোনো ড্রামা আপলোড করা হয়নি।
            </p>
          )}
        </div>
      </div>

      {/* এডিট করার মডাল (পপআপ) */}
      {editingDrama && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">
          <div className="bg-[#181818] p-6 md:p-8 rounded-xl border border-gray-700 w-full max-w-md shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-white border-b border-gray-800 pb-3">Edit Drama</h3>
            <form onSubmit={handleUpdate} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Drama Title</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full p-3 bg-[#222222] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-600 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Update Image (Optional)</label>
                <input
                  type="file"
                  onChange={(e) => setEditFile(e.target.files[0])}
                  className="w-full text-gray-400 text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#222222] file:text-white hover:file:bg-gray-700 cursor-pointer"
                />
              </div>
              <div className="flex gap-4 mt-8 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingDrama(null)}
                  className="flex-1 bg-[#333333] hover:bg-[#444444] text-white font-medium py-3 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 flex justify-center items-center"
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}