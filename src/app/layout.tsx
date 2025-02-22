import { Inter } from "next/font/google";

import "./globals.css";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

import Navbar from "../components/Navbar";
import { TanstackProvider } from "../config/tanstack-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Agenda saúde",
  description: "Sua aplicação de saúde"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanstackProvider>
          <Navbar />
          <main className=" ">{children}</main>
          <Toaster />
          <Footer />
        </TanstackProvider>
      </body>
    </html>
  );
}
