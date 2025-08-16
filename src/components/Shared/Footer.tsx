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
import { useAddNewsletterMutation } from "@/features/newsletter/newsletterApi";
import Swal from "sweetalert2";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/utils/utils";

const newsletterSchema = z.object({
  firstname: z
    .string({
      invalid_type_error: "firstname must a text or string",
      required_error: "firstname is requried",
    })
    .min(3, { message: "firstname must be 3 characters long at least" }),
  lastname: z
    .string({
      invalid_type_error: "lastname must a text or string",
      required_error: "lastname is requried",
    })
    .min(3, { message: "lastname must be 3 characters long at least" }),
  email: z
    .string({
      invalid_type_error: "email must a text or string",
      required_error: "email is requried",
    })
    .email({ message: "Please provide a valid email address" }),
  terms: z.boolean({
    required_error: "You must accept the terms and conditions",
  }),
});

const Footer = () => {
  const [addNewsLetter] = useAddNewsletterMutation();
  const pathName = usePathname();

  const form = useForm<z.infer<typeof newsletterSchema>>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      terms: false,
    },
  });

  if (pathName === "/dashboard") return null;

  const onSubmit = async (values: z.infer<typeof newsletterSchema>) => {
    const data = {
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
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
        Swal.fire({
          title: res?.message,
          icon: "success",
          draggable: true,
        });

        form.reset();
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
            <div>
              <p className="text-white text-sm mb-5">
                The best of Forbes, delivered to your inbox
              </p>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8 w-full text-white"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail *</FormLabel>
                        <FormControl>
                          <Input  {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name *</FormLabel>
                        <FormControl>
                          <Input  {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name *</FormLabel>
                        <FormControl>
                          <Input  {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              name={field.name}
                              ref={field.ref}
                              className={cn(
                                "rounded border border-gray-300! w-4! h-4!", // default border
                                field.value && "border-gray-300!" // checked হলে border blue
                              )}
                            />
                          </FormControl>
                          <div className="text-xs flex items-center gap-x-1">
                            <span>I accept the Forbes Germany&apos;s</span>
                            <Link href="/terms-of-use" className="underline">
                              Terms
                            </Link>
                            <span>&</span>
                            <Link href="/privacy-policy" className="underline">
                              Privacy Policy
                            </Link>
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="cursor-pointer text-xl font-news-title"
                  >
                    Subscribe
                  </Button>
                </form>
              </Form>
            </div>
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
