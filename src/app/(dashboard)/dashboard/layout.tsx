import SidebarLayout from "@/components/dashboard/DashboardLayout/DashboardLayout";
import { ReduxProvider } from "@/provider/ReduxProvider";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import "../../globals.css";

export const metadata = {
  title:
    "Admin DashBoard - Your Trusted News Source | Latest Updates & Breaking Stories",
  description:
    "Get the latest breaking news, in-depth analysis, and expert opinions on the top stories. Stay updated with a wide range of topics including politics, business, technology, entertainment, and more. Your go-to source for trustworthy and timely news.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    // Login e redirect koro jodi token na thake
    redirect("/login");
  }

  try {
    if (!process.env.JWT_SECRET) return "Token Not FOund";
    jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    // Invalid token holeo login e redirect
    redirect("/login");
  }

  return (
    <ReduxProvider>
      <SidebarLayout>{children}</SidebarLayout>
    </ReduxProvider>
  );
}

