import { navMenuList } from "@/constants";
import Link from "next/link";
import React from "react";

export default function MobileNavigation( { setIsOpen }: {  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>}) {
  return (
    <div className="lg:hidden animate-in slide-in-from-top-2 mt-20 duration-500">
      <nav className="flex flex-col border-t border-white/20">
        {navMenuList.map((item) => (
          <Link
            key={item.id}
            href={item.link}
            onClick={() => setIsOpen(false)}
            className="px-4 py-4 text-lg font-medium text-white hover:bg-forbes-white/5 transition-colors border-b border-white/20"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
