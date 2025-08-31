"use client";
import { useAddNewsletterMutation } from "@/features/newsletter/newsletterApi";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

const Footer = () => {
  const [addNewsLetter] = useAddNewsletterMutation();
  const pathName = usePathname();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    terms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  if (pathName === "/dashboard") return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
    };

    // Define a type for the error object structure
    type NewsletterError = {
      data?: {
        error?: string;
      };
    };

    try {
      const res = await addNewsLetter(data).unwrap();
      if (res.success) {
        setIsSubscribed(true);
      }
    } catch (error) {
      const err = error as NewsletterError;
      if (
        typeof err === "object" &&
        err !== null &&
        err.data &&
        typeof err.data === "object" &&
        err.data !== null &&
        "error" in err.data &&
        err.data.error === "You're already subscribed"
      ) {
        Swal.fire({
          title: "Failed",
          text: err.data.error,
          icon: "error",
          draggable: true,
        });
      } else {
        Swal.fire({
          title: "Failed",
          text: "Subscription Failed",
          icon: "error",
          draggable: true,
        });
      }
    }
  };

  return (
    <footer className="bg-news-dark py-10 mt-24">
      <div className="px-4 container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-20">
          <div className="flex flex-col md:flex-row gap-20">
            {/* =================== logo ======================= */}
            <div>
              <Link href="/">
                <Image
                  src="/logo.webp"
                  alt="news logo"
                  width={150}
                  height={150}
                  className="w-40 h-10"
                />
              </Link>
            </div>

            {/* ================ news letter form ================= */}
            {isSubscribed ? (
              <div>
                <h2 className="footer-success-title">All Set</h2>
                <p className="footer-success-message max-w-2xs w-full">Please check your inbox to confirm your subscription. Welcome to the Forbes community</p>
              </div>
            ) : (
              <div className="font-footer-newsletter">
                <p className="text-white text-sm mb-5">
                  The best of Forbes, delivered to your inbox
                </p>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 w-full text-white"
                >
                  <div className="space-y-4">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full py-[10px] px-4 border border-white! outline-none hover:border-white/40! duration-500 hover:duration-500 mt-2 text-white text-sm font-footer-newsletter"
                    />
                  </div>

                  <div>
                    <label>First Name *</label>
                    <input
                      type="text"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      required
                      className="w-full py-[10px] px-4 border border-white! outline-none hover:border-white/40! duration-500 hover:duration-500 mt-2 text-white text-sm font-footer-newsletter"
                    />
                  </div>

                  <div>
                    <label>Last Name *</label>
                    <input
                      type="text"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      required
                      className="w-full py-[10px] px-4 border border-white! outline-none hover:border-white/40! duration-500 hover:duration-500 mt-2 text-white text-sm font-footer-newsletter"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="terms"
                      checked={formData.terms}
                      onChange={handleChange}
                      required
                      className=" appearance-none w-4 h-4 border-2 border-white bg-transparent checked:after:content-['✔'] checked:after:block checked:after:text-white checked:after:text-center checked:after:leading-4 flex justify-center items-center"
                    />
                    <span className="text-xs font-footer-newsletter">
                      I accept the{" "}
                      <a href="/terms-of-use" className="underline">
                        Terms
                      </a>{" "}
                      &{" "}
                      <a href="/privacy-policy" className="underline">
                        Privacy Policy
                      </a>
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="text-sm border-2 cursor-pointer px-3 py-2 font-footer-newsletter"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            )}
          </div>

          <div className="text-white">
            <h2 className="text-lg font-news-title mb-5">Sections</h2>
            <ul className="text-base space-y-3.5">
              <li className="duration-500 hover:text-news-cta hover:underline hover:duration-500">
                <Link href="news">News</Link>
              </li>
              <li className="duration-500 hover:text-news-cta hover:underline hover:duration-500">
                <Link href="list">List</Link>
              </li>
              <li className="duration-500 hover:text-news-cta hover:underline hover:duration-500">
                <Link href="life">Life</Link>
              </li>
              <li className="duration-500 hover:text-news-cta hover:underline hover:duration-500">
                <Link href="/magazine">Magazine</Link>
              </li>
            </ul>
          </div>

          <div className="text-white">
            <h2 className="text-lg font-news-title mb-5">Exlore</h2>
            <ul className="text-base space-y-3.5">
              <li className="duration-500 hover:text-news-cta hover:underline hover:duration-500">
                <Link href="news">Billionaires</Link>
              </li>
              <li className="duration-500 hover:text-news-cta hover:underline hover:duration-500">
                <Link href="list">Entrepreneurs</Link>
              </li>
              <li className="duration-500 hover:text-news-cta hover:underline hover:duration-500">
                <Link href="life">Innovation</Link>
              </li>
              <li className="duration-500 hover:text-news-cta hover:underline hover:duration-500">
                <Link href="/magazine">Leadership</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* ===================== copyright */}
      <div className="text-xs  border-t container mx-auto mt-10 text-gray-200 flex flex-col min-[500px]:flex-row flex-wrap items-center gap-1.5 justify-center sm:justify-between pt-10">
        <p>© 2025 Forbes Germany. All rights reserved.</p>

        <div className="space-x-1.5 flex items-center">
          <Link
            href="/privacy-policy"
            className="duration-500 hover:text-news-cta hover:duration-500"
          >
            Privacy Policy
          </Link>
          <span>&</span>
          <Link
            href="/terms-of-use"
            className="duration-500 hover:text-news-cta hover:duration-500"
          >
            Terms of Use
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
