import type { Metadata } from "next";
import "./globals.css";
import "animate.css";
import { Poppins, MuseoModerno, Inter } from "next/font/google";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

import { TooltipProvider } from "../components/ui/tooltip";
import { TanstackProvider } from "../config/tanstack-provider";
import { AuthProvider } from "../hooks/auth";
import { getServerAuth } from "../hooks/getServerAuth";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins"
});

const museo = MuseoModerno({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-museo"
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Agenda saúde",
  description: "Sua aplicação de saúde"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { token, user } = getServerAuth();
  return (
    <html lang="en">
      <body
        className={`${poppins.className} ${museo.variable} ${inter.className} scroll-custom antialiased`}
      >
        <TooltipProvider>
          <AuthProvider initialToken={token} initialUser={user}>
            <TanstackProvider>
              <Header />
              {children}
              <Footer />
            </TanstackProvider>
          </AuthProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
