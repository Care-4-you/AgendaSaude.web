"use client";

import { ICidade } from "@/shared/interfaces/ICidade";
import { IClinica } from "@/shared/interfaces/IClinica";
import "leaflet/dist/leaflet.css";
import "./Popup.css";
import { useState } from "react";
import { LayersControl, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import CardClinica from "../CardClinica";
import {} from "react-icons/io";
import pin from "../../../public/static/pin.svg";
import { Icon } from "leaflet";
// import Image from "next/image";
// mport citto from "../../../public/Imagens/CITTO.jpg";

interface MapaProps {
  cidade?: ICidade
  clinicas?: IClinica[]
}

export default function Mapa({cidade={geo:{lat: -14.4, lng: -57}}, clinicas}: MapaProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [geoData, setGeoData] = useState({ lat:cidade.geo.lat, lng:cidade.geo.lng});

  const customIcon = new Icon({
    iconUrl: "https://cdn.icon-icons.com/icons2/3357/PNG/512/map_navigation_pin_maps_pointer_clinic_placeholder_location_hospital_icon_210661.png",
    iconSize: [32, 32],
    iconAnchor: [16, 10]
  });
  
  return (
    <MapContainer
      center={[geoData.lat, geoData.lng]}
      zoom={4}
      style={{ height: "90vh", width: "100%"}}
    >
      <LayersControl>
        <LayersControl.BaseLayer name="Light">
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
        <LayersControl.BaseLayer checked name="Satélite">
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
        {clinicas && (
          clinicas.map( clinica => {
            return (
              <Marker key={clinica.id} position={[clinica.endereco.geo.lat, clinica.endereco.geo.lng]} title="a" icon={customIcon}>
                <Popup className="mapa_popup">
                  <CardClinica clinica={clinicas[0]}/>
                </Popup>
              </Marker>
            );
          })
        )}
      </LayersControl>
    </MapContainer>
  );
}