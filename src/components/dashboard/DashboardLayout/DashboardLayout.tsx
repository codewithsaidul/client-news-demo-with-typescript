"use client";

import { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import { Menu } from "lucide-react";
import { IoMdLogOut } from "react-icons/io";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      router.push("/login");
    } catch {
      Swal.fire({
        title: "Logout failed",
        icon: "error",
        draggable: true,
      });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 z-50 min-h-screen  bg-news-dark p-5 transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0 w-[80%] sm:w-[60%] md:w-[50%] " : "-translate-x-full"}
          lg:w-[30%] xl:w-[20%] lg:translate-x-0 lg:relative
        `}
      >
        <div className="sticky top-10 min-h-screen">
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 w-[70%]">
        {/* 🔼 Top Navbar (with Menu Button on mobile) */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-white shadow sticky top-0 z-40">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-700"
          >
            <Menu />
          </button>

          {/* Logout */}
          <div onClick={handleLogout}>
            <p className="cursor-pointer  flex items-center gap-2 text-2xl">
              <span>
                <IoMdLogOut size={32} />
              </span>

              <span>Logout</span>
            </p>
          </div>
        </div>

        {/* Children Content */}
        <div>{children}</div>
      </div>
    </div>
  );
}
