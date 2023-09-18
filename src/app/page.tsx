import Mapa from "../components/Mapa";
import clinicas from "../Api/db.json";

export default function Home() {

  return (
    <div>
      <header>
        <h1 className="text-center font-bold text-3xl p-4 bg-roxo text-white max-h-[10vh] h-[10vh]">Agenda Saúde</h1>
      </header>
      <main>
        <div className="flex">
          <Mapa clinicas={[clinicas.clinicas[0]]}/>
        </div>
      </main>
    </div>
  );
}