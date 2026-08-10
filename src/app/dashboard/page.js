// src/app/dashboard/page.js
import clientPromise from "@/lib/mongodb";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import DeleteUserButton from "@/components/DeleteUserButton";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  let users = [];
  
  try {
    const client = await clientPromise;
    const db = client.db("tech_db");
    const data = await db.collection("users").find({}).sort({ createdAt: -1 }).toArray();
    
    users = data.map(user => ({
      _id: user._id.toString(),
      email: user.email,
      password: user.password,
      createdAt: user.createdAt ? new Date(user.createdAt).toLocaleString() : "N/A"
    }));
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }

  return (
    <div className="min-h-screen bg-[#121212] p-6 md:p-12 text-white">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex items-center justify-between mb-6 border-b border-gray-800 pb-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 bg-[#222222] hover:bg-[#333333] border border-gray-700 text-gray-300 hover:text-white px-4 py-2 rounded-md transition-colors text-sm font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <LogoutButton />
        </div>

        <h1 className="text-3xl font-bold text-red-600 mb-2">Admin Dashboard</h1>
        <p className="mb-8 text-gray-400">
          এখানে রেজিস্ট্রেশন করা ইউজারদের তালিকা দেওয়া হলো। (সিকিউরিটির জন্য পাসওয়ার্ডগুলো হ্যাশ ফরম্যাটে আছে)
        </p>

        <div className="overflow-x-auto bg-[#181818] rounded-lg border border-gray-800 shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#222222] border-b border-gray-700">
                <th className="p-4 font-semibold text-gray-300">Email Address</th>
                <th className="p-4 font-semibold text-gray-300">Hashed Password</th>
                <th className="p-4 font-semibold text-gray-300">Registration Date</th>
                <th className="p-4 font-semibold text-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id} className="border-b border-gray-800 hover:bg-[#1f1f1f] transition-colors">
                    <td className="p-4 font-medium text-gray-200">{user.email}</td>
                    <td className="p-4 text-sm font-mono text-gray-500 max-w-xs truncate" title={user.password}>
                      {user.password}
                    </td>
                    <td className="p-4 text-sm text-gray-400">{user.createdAt}</td>
                    <td className="p-4">
                      <DeleteUserButton userId={user._id} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-500">
                    এখনো কোনো ইউজার রেজিস্ট্রেশন করেনি।
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}