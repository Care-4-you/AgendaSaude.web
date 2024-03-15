import { Inter } from "next/font/google";

import "./globals.css";

import { ClinicaProvider } from "@/hooks/useClinicas";
import { Model, createServer } from "miragejs";

import db from "../Api/db.json" assert { type: "json" };
import Navbar from "../components/Navbar";

const inter = Inter({ subsets: ["latin"] });

// criando rota api dinamica
createServer({
  models: {
    clinica: Model
  },
  seeds(server) {
    server.db.loadData({
      clinicas: db.clinicas
    });
  },
  routes() {
    this.namespace = "api";
    this.get("/clinicas", () => ({
      clinicas: db.clinicas
    }));
  }
});

console.log(db.clinicas);

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
        <ClinicaProvider>
          <Navbar />
          <main className=" ">{children}</main>
          <p></p>
        </ClinicaProvider>
      </body>
    </html>
  );
}
