import { Inter } from "next/font/google";

import Navbar from "../components/Navbar";

import "./globals.css";

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
        <Navbar />
        <main className="p-8 ">{children}</main>
      </body>
    </html>
  );
}
