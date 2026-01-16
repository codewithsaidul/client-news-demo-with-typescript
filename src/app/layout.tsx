import "./globals.css";
import { ReduxProvider } from "@/provider/ReduxProvider";
import CookieConsentBanner from "@/components/Shared/CookieConsentBanner";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Your Trusted News Source | Latest Updates & Breaking Stories",
  description:
    "Get the latest breaking news, in-depth analysis, and expert opinions on the top stories. Stay updated with a wide range of topics including politics, business, technology, entertainment, and more. Your go-to source for trustworthy and timely news.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Your Trusted News Source | Latest Updates & Breaking Stories",
    description:
      "Get the latest breaking news, in-depth analysis, and expert opinions on the top stories. Stay updated with a wide range of topics including politics, business, technology, entertainment, and more. Your go-to source for trustworthy and timely news.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    siteName: "Your Trusted News Source",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/og-image.webp`,
        width: 1200,
        height: 630,
        alt: "Your Trusted News Source",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
          <CookieConsentBanner />
        </ReduxProvider>
      </body>
    </html>
  );
}
