import Banner from "@/components/Shared/Banner";
import Link from "next/link";
import React from "react";
import AllListsNews from "./AllListsNews";

const page = () => {
  return (
    <div>
      <Banner title="lists" image="/images/banner/listBanner.webp" />

      <div className="relative w-full border-b border-gray-300 pb-5">
        <div className="flex gap-5 relative px-4 lg:px-8">
          <Link
            href={"/lists"}
            className="inline-block py-3 font-medium text-xl text-center text-rose-500"
          >
            All Lists
          </Link>

          {/* Active Tab Full-Width Border */}
          <div
            className=
              "absolute -bottom-5 left-5 h-1 bg-rose-500 transition-all duration-300 w-[7%]"
          />
        </div>
      </div>

      <AllListsNews />
    </div>
  );
};

export default page;
