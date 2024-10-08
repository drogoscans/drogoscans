import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import NavbarAdmin from "@/components/navbar/navbaradmin";
import MenuBar from "@/components/navbar/menubaradmin";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Drogo Scans Admin",
  description: "Drogo Scans",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <html lang="en">
      <body className={`bg-[#0f1431] min-h-screen antialiased ${inter.className}`}>
        {/* Navbar Component */}
        <header className="sticky top-0 z-50 shadow-md items-center">
          <NavbarAdmin />
        </header>

        {/* Main Layout with Sidebar and Content */}
        <div className="flex">
          {/* Sidebar Component */}
          <aside className="hidden lg:flex">
            <MenuBar />
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 p-6 lg:ml-64 text-white"> {/* Offset main content for sidebar */}
            {children}
          </main>
        <Toaster />
        </div>
      </body>
    </html>
  );
}
