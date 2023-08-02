import Mapa from "../components/Mapa";

export default function Home() {
  return (
    <div className="">
      <Mapa cidade={{latitude: -11.337516, longitude: -38.96385}} clinicas={[{latitude: -11.337516, longitude: -38.963585, id: 1}]}/>
    </div>
  );
}
