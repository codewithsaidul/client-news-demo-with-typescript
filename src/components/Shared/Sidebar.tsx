"use client";
import { navMenuList } from "@/constants";
import { ISideBar } from "@/types/client";
import { twMerge } from "tailwind-merge";
import NavLink from "./NavLink";

// if need also can add type safty for this props
const Sidebar = ({ isOpen, setIsOpen }: ISideBar) => {
  return (
    <div
      className={twMerge(
        "h-screen bg-news-dark absolute top-20 right-0 overflow-y-auto sidebar transform transition-transform duration-500 ease-in-out z-[10000]",
        isOpen ? "translate-x-0 duration-500" : "translate-x-full"
      )}
    >
      <div className="px-8 py-12">
        {/* =========== nav secctions ============== */}
        <div>
          <ul className="flex flex-col gap-7">
            {navMenuList.map((menu) => (
              <NavLink
                key={menu.id}
                name={menu.name}
                link={menu.link}
                setIsOpen={setIsOpen}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
