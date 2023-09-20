import Mapa from "../components/Mapa";
import { api } from "@/lib/api";
import { IClinica } from "@/shared/interfaces/IClinica";

export default async function Home() {
  const response = await api.get("/clinicas");

  const clinicas: IClinica[] = response.data;

  return (
    <div>
      <header>
        <h1 className="text-center font-bold text-3xl p-4 bg-roxo text-white max-h-[10vh] h-[10vh]">Agenda Saúde</h1>
      </header>
      <main>
        <div className="flex">
          <Mapa clinicas={clinicas}/>
        </div>
      </main>
    </div>
  );
}