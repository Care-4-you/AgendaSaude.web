"use client";

import { ICidade } from "@/shared/interfaces/ICidade";
import { IClinica } from "@/shared/interfaces/IClinica";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

interface MapaProps {
  cidade: ICidade
  clinicas: IClinica[]
}

export default function Mapa({cidade, clinicas}: MapaProps) {
  // const position :  = [51.505, 51.505];
  return (
    <MapContainer
      center={[cidade.latitude, cidade.longitude]}
      zoom={14}
      style={{ height: "700px", width: "100vw"}}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {clinicas.length > 0 && clinicas.map((clinica) => {
        return (
          <Marker position={[clinica.latitude, clinica.longitude]} key={clinica.id}>
            <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}