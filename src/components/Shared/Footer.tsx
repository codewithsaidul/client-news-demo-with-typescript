"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const newsletterSchema = z.object({
  name: z
    .string({
      invalid_type_error: "name must a text or string",
      required_error: "name is requried",
    })
    .min(3, { message: "name must be 3 character at least" }),
  email: z
    .string({
      invalid_type_error: "email must a text or string",
      required_error: "email is requried",
    })
    .email(),
});

const Footer = () => {
  const pathName = usePathname();

  const form = useForm<z.infer<typeof newsletterSchema>>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  if (pathName === "/dashboard") return null;

  const onSubmit = (values: z.infer<typeof newsletterSchema>) => {
    console.log(values);
  };

  return (
    <footer className="bg-news-dark py-20 mt-24">
      <div className="flex flex-col lg:flex-row gap-20 px-4 container mx-auto">
        <div className="flex flex-col sm:flex-row gap-10 flex-1 w-full lg:w-[60%]">
          {/* =================== logo ======================= */}
          <div>
            <Link href="/">
              <Image
                src="/logo.webp"
                alt="news logo"
                width={150}
                height={150}
                className="w-60 h-20"
              />
            </Link>
          </div>

          {/* ================ news letter form ================= */}
          <div className="w-full">
            <p className="text-white text-sm mb-5">The best of Forbes, delivered to your inbox</p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 w-full text-white"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="jhon doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input placeholder="jhonedoe@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg" className="bg-news-cta duration-500 hover:bg-news-cta/80 cursor-pointer hover:duration-500">
                  Subscribe
                </Button>
              </form>
            </Form>
          </div>
        </div>

        <div className="text-white w-full flex flex-col sm:flex-row gap-10 sm:gap-32 lg:w-[40%]">

          <div>
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


          <div>
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
    </footer>
  );
};

export default Footer;
