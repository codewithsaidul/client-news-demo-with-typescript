"use client";
import { useGetCurrentUserQuery } from "@/features/user/currentUser/currentUserAPI";
import { ISideBar } from "@/types/client";
import { Construction, Mail, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaHome, FaUsers } from "react-icons/fa";
import { GiNewspaper } from "react-icons/gi";
import { MdAddBox, MdDashboard } from "react-icons/md";

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
    title: "Newsletter",
    href: "/dashboard/newsletter",
    icon: <Mail size={32} />,
  },
  {
    id: 6,
    title: "Draft",
    href: "/dashboard/allDraftNews",
    icon: <Construction size={32} />,
  },
  {
    id: 7,
    title: "Trash News",
    href: "/dashboard/trashNews",
    icon: <Trash2 size={32} />,
  },
];

const Sidebar = ({ isOpen, setIsOpen }: ISideBar) => {
  const { data: user } = useGetCurrentUserQuery(undefined);

  const handleCloseSidebar = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <div className="px-4 md:px-8 flex flex-col justify-between min-h-screen relative">
      <div className="mt-16">
        <Link href="/">
          <Image
            src="/logo.webp"
            alt="news logo"
            width={150}
            height={150}
            priority
            className="w-40 h-10"
          />
        </Link>

        {/* nav links */}
        <div className="mt-32">
          <ul className="flex flex-col gap-10">
            {navLinks.map((item) => (
              <li
                onClick={handleCloseSidebar}
                key={item.id}
                className="border-b border-white/20 pb-3"
              >
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

      {/* close btn */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="absolute top-0 right-2 text-white cursor-pointer"
        >
          <X size={40} />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
