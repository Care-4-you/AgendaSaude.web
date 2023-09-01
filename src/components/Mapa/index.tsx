"use client";

import { ICidade } from "@/shared/interfaces/ICidade";
import { IClinica } from "@/shared/interfaces/IClinica";
import "leaflet/dist/leaflet.css";
import { LayersControl, MapContainer, TileLayer } from "react-leaflet";
// import citto from "../../../public/Imagens/CITTO.jpg";

interface MapaProps {
  cidade: ICidade
  clinicas?: IClinica[]
}

export default function Mapa({cidade}: MapaProps) {
  // const position :  = [51.505, 51.505];
  return (
    <MapContainer
      center={{lat:cidade.geo.lat, lng:cidade.geo.lng}}
      zoom={14}
      style={{ height: "90vh", width: "80%"}}
    >
      <LayersControl>
        <LayersControl.BaseLayer checked name="Light">
          <TileLayer
            url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
            attribution= {"&copy; OpenStreetMap France | &copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors"}
            maxZoom={20}
            opacity={1}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Dark">
          <TileLayer
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            subdomains="abcd"
            attribution= {"&copy; <a href=\"https://stadiamaps.com/\">Stadia Maps</a>, &copy; <a href=\"https://openmaptiles.org/\">OpenMapTiles</a> &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors"}
            maxZoom={20}
            opacity={1}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Satélite">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            subdomains={["mt0", "mt1", "mt2", "mt3"]}
            attribution={"Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"}
            maxZoom={21}
            minZoom={1}
            opacity={1}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Google(não encontrei o attribution correto)">
          <TileLayer
            url="http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}"
            attribution="google"
            maxZoom={21}
            minZoom={1}
            opacity={1}
          />
        </LayersControl.BaseLayer>
      </LayersControl>
    </MapContainer>
  );
}