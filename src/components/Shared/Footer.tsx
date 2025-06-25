"use client"
import { socialLinks } from "@/constants/data";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";


const Footer = () => {

  const pathName = usePathname();
  if (pathName === "/dashboard") return null;



  return (
    <footer className="bg-news-dark py-20 px-4 md:px-8 mt-24">
      <div className="flex flex-col gap-y-10 justify-between items-center">
        <div>
          <Link href="/">
            <Image
              src="/logo.webp"
              alt="news logo"
              width={150}
              height={150}
              className="w-full h-full"
            />
          </Link>
        </div>

        {/* ============ social links =============== */}
        <div className="flex  items-center gap-5">
          {socialLinks.map((social) => (
            <Link
              key={social.id}
              href={social.link}
              aria-label={social.name}
              target="_blank"
              className="text-2xl"
            >
              {social.icon}
            </Link>
          ))}
        </div>
      </div>

    </footer>
  );
};

export default Footer;
