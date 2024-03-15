"use client";
import { api } from "@/lib/api";
import { IClinica } from "@/shared/interfaces/IClinica";

import Mapa from "../../components/Map";

import { useEffect, useState } from "react";

export default async function Home() {
  const [clinicas, setClinicas] = useState<IClinica[]>([]);

  useEffect(() => {
    api.get("clinicas").then((response) => setClinicas(response.data.clinicas));
  }, []);

  return (
    <div>
      <main>
        <div className="flex">
          <Mapa clinicas={clinicas} />
        </div>
      </main>
    </div>
  );
}
