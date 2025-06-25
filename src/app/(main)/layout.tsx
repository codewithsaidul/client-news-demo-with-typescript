
import Navbar from "@/components/Shared/Navbar";
import "../globals.css";
import Footer from "@/components/Shared/Footer";



export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}