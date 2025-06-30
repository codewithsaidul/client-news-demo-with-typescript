"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Header = () => {

  return (
    <div className="flex justify-between items-center border-b pb-7">
      <h2 className="text-3xl font-bold font-title">All News</h2>
      <div className="flex items-center gap-4">
        <Button>
          <Link href="/dashboard/addNews">Add News</Link>
        </Button>
      </div>
    </div>
  );
};

export default Header;
