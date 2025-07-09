"use client";

import { useEffect, useState } from "react";
import {
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./Popup.css";

import { Icon } from "leaflet";
import CardClinica from "../../../../components/card-clinic";

interface ClinicaAPI {
  id: number;
  name: string;
  phone: string;
  cellPhone: string;
  whatsapp: string;
  hasNumber: boolean;
  houseNumber: string;
  acceptTerm: boolean;
  email: string;
  cnpj: string;
  address: string;
  cep: string;
  city: string;
  state: string;
  neighborhood: string;
  complement: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  specialty: { id: number; value: string; label: string }[];
  healthInsurance: { id: number; value: string; label: string }[];
  imagem_url?: string[];
  avaliacao?: number;
}

export default function Map() {
  const [clinicas, setClinicas] = useState<ClinicaAPI[]>([]);
  const [geoData, setGeoData] = useState({
    lat: -14.4,
    lng: -57
  });
  const url = process.env.NEXT_PUBLIC_SERVER_URL;

  const customIcon = new Icon({
    iconUrl:
      "https://png.pngtree.com/png-clipart/20221229/original/pngtree-hospital-location-pin-icon-in-red-color-png-image_8824531.png",
    iconSize: [48, 48],
    iconAnchor: [24, 48]
  });

  useEffect(() => {
    async function fetchClinicas() {
      try {
        const res = await fetch(`${url}/clinics`);
        const json = await res.json();
        const data = json.data || [];

        setClinicas(data);

        if (data.length > 0) {
          setGeoData({
            lat: data[0].latitude,
            lng: data[0].longitude
          });
        }
      } catch (error) {
        console.error("Erro ao buscar clínicas:", error);
      }
    }

    fetchClinicas();
  }, []);

  return (
    <MapContainer
      center={[geoData.lat, geoData.lng]}
      zoom={5}
      style={{ height: "91.6vh", width: "100%", zIndex: "1" }}
    >
      <LayersControl>
        <LayersControl.BaseLayer name="Light">
          <TileLayer
            url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            maxZoom={20}
            opacity={1}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Dark">
          <TileLayer
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            maxZoom={20}
            opacity={1}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer checked name="Satélite">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
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

        {clinicas.map((clinica) => {
          const lat = clinica.latitude;
          const lng = clinica.longitude;

          if (!lat || !lng) return null;

          return (
            <Marker key={clinica.id} position={[lat, lng]} icon={customIcon}>
              <Popup className="mapa_popup">
                <CardClinica clinica={clinica} />
              </Popup>
            </Marker>
          );
        })}
      </LayersControl>
    </MapContainer>
  );
}
