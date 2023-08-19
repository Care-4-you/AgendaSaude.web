"use client";

import { ICidade } from "@/shared/interfaces/ICidade";
import { IClinica } from "@/shared/interfaces/IClinica";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import citto from "../../../public/Imagens/CITTO.jpg";

interface MapaProps {
  cidade: ICidade
  clinicas: IClinica[]
}

export default function Mapa({cidade, clinicas}: MapaProps) {
  // const position :  = [51.505, 51.505];
  return (
    <MapContainer
      center={[cidade.geo.lat, cidade.geo.lng]}
      zoom={14}
      style={{ height: "700px", width: "100vw"}}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {clinicas.length > 0 && clinicas.map((clinica) => {
        return (
          <Marker position={[clinica.endereco.geo.lat, clinica.endereco.geo.lng]} key={clinica.id}>
            <Popup>
              <img src="../../../public/next.svg" alt="a" className="w-8 h-8" />
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}