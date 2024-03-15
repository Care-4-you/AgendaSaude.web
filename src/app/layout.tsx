import { Inter } from "next/font/google";

import Navbar from "../components/Navbar";

import "./globals.css";

import { Model, createServer } from "miragejs";

import db from "../Api/db.json" assert { type: "json" };

const inter = Inter({ subsets: ["latin"] });

// criando rota api dinamica
createServer({
  models: {
    clinica: Model
  },
  seeds(server) {
    server.db.loadData({
      clinicas: db
    });
  },
  routes() {
    this.urlPrefix = "http://localhost:3000";
    this.namespace = "api";
    this.get("/clinicas", () => {
      return this.schema.all("clinica");
    });
  }
});

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
        <main className=" ">{children}</main>
        <p></p>
      </body>
    </html>
  );
}
