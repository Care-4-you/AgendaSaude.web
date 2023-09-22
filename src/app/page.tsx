import Mapa from "../components/Mapa";
import { api } from "@/lib/api";
import { IClinica } from "@/shared/interfaces/IClinica";

export default async function Home() {
  const response = await api.get("/clinicas");

  const clinicas: IClinica[] = response.data;

  return (
    <div>
      <header className="flex flex-wrap items-center justify-between bg-roxo p-3 lg:h-[10vh] lg:gap-4 lg:px-20">
        <h1 className="align-middle text-3xl font-bold text-white">
          Agenda Saúde
        </h1>
        <div className="flex flex-wrap lg:gap-4">
          <input
            type="text"
            placeholder="Cidade"
            className="rounded-md p-2 px-4"
          />
          <input
            type="text"
            placeholder="Especialidade"
            className="rounded-md p-2 px-4"
          />
          <button className="rounded-md bg-white p-2 px-4 lg:ml-4">
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
