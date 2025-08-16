"use client";
import { navMenuList } from "@/constants";
import { NavMenuList } from "@/types/client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { Input } from "../ui/input";
import Sidebar from "./Sidebar";
import { Search, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const pathName = usePathname();
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim() !== "") {
      router.push(`/search?s=${encodeURIComponent(query.trim())}`);
      setQuery("");
      setShowInput(false);
    }
  };

  let headerColor;

  if (
    pathName === "/" ||
    pathName === "/news" ||
    pathName === "/lists" ||
    pathName === "/life"
  ) {
    headerColor = "bg-news-headline";
  } else {
    headerColor = "bg-news-dark";
  }

  if (pathName === "/dashboard") return null;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 py-6 ${headerColor}`}>
      <nav className="px-4 container mx-auto">
        <div className="flex justify-between items-center">
          {/* =============== logo ================== */}
          <div className="flex items-center gap-16">
            <Link href="/">
              <Image
                src="/logo.webp"
                alt="news logo"
                width={100}
                height={100}
                priority
                className="w-full h-full"
              />
            </Link>

            <div className="max-sm:hidden">
              <ul className="flex gap-5">
                {navMenuList.map(({ id, link, name }: NavMenuList) => (
                  <li
                    key={id}
                    className="text-news-white-bg text-xl news__title max-sm:border-b max-sm:border-white/30 max-sm:pb-7"
                  >
                    <Link href={link}>{name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* =============== search icon =================== */}
          <div className="flex items-center gap-5">
            <span
              onClick={() => setShowInput(!showInput)}
              className="cursor-pointer"
            >
              {
                showInput ? <X size={24} color="#FFF" /> : <FaMagnifyingGlass size={24} color="#FFF" />
              }
            </span>
            <span className="text-3xl min-sm:hidden font-bold cursor-pointer transition-all duration-1000">
              {isOpen ? (
                <IoMdClose
                  size={36}
                  color="#FFF"
                  onClick={() => setIsOpen(!isOpen)}
                  className="transition-transform transform scale-100"
                />
              ) : (
                <IoMdMenu
                  size={36}
                  color="#FFF"
                  onClick={() => setIsOpen(!isOpen)}
                  className="transition-transform transform scale-105"
                />
              )}
            </span>
          </div>
        </div>

        {/* ================= Side bar ==================== */}
        <div>
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>

        {showInput && (
          <div>
            <div className="fixed inset-0 bg-black/20 bg-opacity-10 top-22 transition-opacity z-40 min-h-screen" />
            <div className="transition-all duration-500 absolute top-22 left-1/2 transform -translate-x-1/2 w-full max-w-7xl px-4 z-50">
              <div className="bg-white flex items-center justify-between px-6 rounded-full">
                <Input
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  placeholder="search here..."
                  className="text-news-headline bg-transparent py-6 text-lg outline-none border-none focus-visible:border-0 focus:outline-none focus:ring-0 focus-visible:ring-0"
                />

                <Search color="#000" />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
