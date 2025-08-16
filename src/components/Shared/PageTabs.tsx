"use client";

import { PageTabsProps } from "@/types/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

export default function PageTabs({ tabs }: PageTabsProps) {
  const pathname = usePathname();

  return (
    <div className="relative w-full min-[900px]:border-b min-[900px]:border-gray-300 min-[900px]:pb-5">
      <div className="flex max-[899px]:flex-wrap max-[899px]:justify-center gap-x-5 -gap-y-2 min-[900px]:gap-x-12  relative px-4 container mx-auto">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={twMerge(
                "inline-block py-3 font-medium text-xl text-center",
                isActive ? "text-rose-500" : "text-gray-500"
              )}
            >
              {tab.name}
            </Link>
          );
        })}

        {/* Active Tab Full-Width Border */}
        <div
          className={twMerge(
            "min-[900px]:absolute min-[900px]:-bottom-5  min-[900px]:h-1 min-[900px]:bg-rose-500 min-[900px]:transition-all min-[900px]:duration-300",
            pathname === "/news"
              ? "w-[calc(7%)] min-[900px]:left-5"
              : pathname === "/category/innovation"
              ? "w-[calc(6%)] min-[900px]:left-[160px]"
              : pathname === "/category/entrepreneurs"
              ? "w-[calc(9%)] min-[900px]:left-[300px]"
              : pathname === "/category/leadership"
              ? "w-[calc(7%)] min-[900px]:left-[480px]"
              : pathname === "/category/investing"
              ? "w-[calc(6%)] min-[900px]:left-[620px]"
              : pathname === "/category/billionaires"
              ? "w-[calc(7%)] min-[900px]:left-[760px]"
              : "w-0 left-0"
          )}
        />
      </div>
    </div>
  );
}
