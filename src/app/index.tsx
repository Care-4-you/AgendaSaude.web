import Mapa from "../components/Mapa";
import clinicas from "../Api/clinicas.json";

export default function Home() {

  return (
    <div>
      <header>
        <h1 className="text-center font-bold text-3xl p-4 bg-roxo text-white">Agenda Saúde</h1>
      </header>
      <main>
        <div className="flex">
          <Mapa clinicas={[clinicas[0]]}/>
        </div>
      </main>
    </div>
  );
}