import { api } from "@/lib/api";
import { IClinica } from "@/shared/interfaces/IClinica";

import Mapa from "../../components/Mapa";

export default async function Home() {
  const response = await api.get("/clinicas");

  const clinicas: IClinica[] = response.data;

  return (
    <div>
      <header className="flex flex-col gap-2 bg-roxo p-2">
        <h1 className="align-middle text-3xl font-bold text-white">
          Agenda Saúde
        </h1>
        <div className="grid w-full gap-2 md:flex lg:gap-4">
          <input
            type="text"
            placeholder="Cidade"
            className="w-full rounded-md p-1 px-4 sm:max-w-sm"
          />
          <input
            type="text"
            placeholder="Especialidade"
            className="w-full rounded-md p-1 px-4 sm:max-w-sm"
          />
          <button className="w-full rounded-md bg-white p-1 px-4 lg:ml-4">
            Encontrar clínicas
          </button>
        </div>
      </header>
      <main>
        <div className="flex">
          <Mapa clinicas={clinicas} />
        </div>
      </main>
    </div>
  );
}
