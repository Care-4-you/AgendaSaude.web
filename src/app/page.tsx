import Mapa from "../components/Mapa";
import clinicas from "../Api/clinicas.json";

export default function Home() {
  return (
    <div className="">
      <Mapa cidade={{geo:{lat: -11.337516, lng: -38.96385}}} clinicas={[clinicas[0]]}/>
    </div>
  );
}