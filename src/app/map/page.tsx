import { api } from "@/lib/api";
import { IClinica } from "@/shared/interfaces/IClinica";

import Mapa from "../../components/Map";

export default async function Home() {
  const response = await api.get("/clinicas");

  const clinicas: IClinica[] = response.data;

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
