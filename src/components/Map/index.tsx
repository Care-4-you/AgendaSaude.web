"use client";

import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function Mapa({cidade, clinicas}) {
  // const position :  = [51.505, 51.505];
  return (
    <MapContainer
      center={[cidade.lat, cidade.long]}
      zoom={13}
      style={{ height: "400px", width: '100vw'}}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {clinicas.map((clinica) => {
        <Marker position={[clinica.lat, clinica.long]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      })}
    </MapContainer>
  );
}
