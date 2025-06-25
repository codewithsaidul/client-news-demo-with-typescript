import { INavLink } from "@/types/client/index.types";
import Link from "next/link";

const NavLink = ( { name, link, setIsOpen }: INavLink ) => {
  return (
    <li onClick={() => setIsOpen(false)} className="text-news-white-bg text-xl font-title max-sm:border-b max-sm:border-white/30 max-sm:pb-7">
      <Link href={link}>{name}</Link>
    </li>
  );
};

export default NavLink;
