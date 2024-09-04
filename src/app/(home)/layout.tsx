import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/navbarhome";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Drogo Scans",
  description: "Drogo Scans",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-black min-h-screen antialiased ${inter.className}`}>
        {/* Navbar Component */}
        <header className="sticky top-0 z-50 shadow-md items-center">
          <Navbar />
        </header>

        {/* Main Content */}
        <main className="flex flex-col items-center justify-start py-4 px-6">
          {children}
        </main>
      </body>
    </html>
  );
}
