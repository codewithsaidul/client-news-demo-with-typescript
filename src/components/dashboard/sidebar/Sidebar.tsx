"use client";
import { useGetCurrentUserQuery } from "@/features/user/currentUser/currentUserAPI";
import axios from "axios";
import { Construction, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaHome, FaUsers } from "react-icons/fa";
import { GiNewspaper } from "react-icons/gi";
import { IoMdLogOut } from "react-icons/io";
import { MdAddBox, MdDashboard } from "react-icons/md";
import Swal from "sweetalert2";

const navLinks = [
  {
    id: 1,
    title: "Back to Home",
    href: "/",
    icon: <FaHome size={32} />,
  },
  {
    id: 2,
    title: "Overview",
    href: "/dashboard",
    icon: <MdDashboard size={32} />,
  },
  {
    id: 3,
    title: "All News",
    href: "/dashboard/allNews",
    icon: <GiNewspaper size={32} />,
  },
  {
    id: 4,
    title: "Add News",
    href: "/dashboard/addNews",
    icon: <MdAddBox size={32} />,
  },
  {
    id: 5,
    title: "Draft",
    href: "/dashboard/allDraftNews",
    icon: <Construction size={32} />,
  },
  {
    id: 6,
    title: "Trash News",
    href: "/dashboard/trashNews",
    icon: <Trash2 size={32} />,
  },
];

const Sidebar = () => {
  const router = useRouter();
  const { data: user } = useGetCurrentUserQuery(undefined);


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
    <div className="mt-16 px-8 flex flex-col justify-between h-[90vh]">
      <div>
        <Link href="/">
          <Image
            src="/logo.webp"
            alt="news logo"
            width={150}
            height={150}
            priority
            className="object-cover w-auto h-auto"
          />
        </Link>

        {/* nav links */}
        <div className="mt-32">
          <ul className="flex flex-col gap-10">
            {navLinks.map((item) => (
              <li key={item.id} className="border-b border-white/20 pb-3">
                <Link
                  href={item.href}
                  className="flex items-center gap-2 text-white text-2xl"
                >
                  <span>{item.icon}</span>
                  {item.title}
                </Link>
              </li>
            ))}

            {/* only super admin can see */}
            {user?.role === "superadmin" && (
              <li className="border-b border-white/20 pb-3">
                <Link
                  href={"/dashboard/users"}
                  className="flex items-center gap-2 text-white text-2xl"
                >
                  <span>
                    <FaUsers size={32} />
                  </span>
                  Users
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Logout */}
      <div onClick={handleLogout}>
        <p className="cursor-pointer text-white flex items-center gap-2 text-2xl">
          <span>
            <IoMdLogOut size={32} />
          </span>

          <span>Logout</span>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
