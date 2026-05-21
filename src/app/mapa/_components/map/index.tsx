"use client";

import { useEffect, useState, useCallback } from "react";
import {
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./Popup.css";
import ClinicaFilter from "@/app/mapa/_components/filter/radiusFilter";
import { Icon } from "leaflet";

import iconPin from "../../../../assets/pinmap.png";
import CardClinica from "../../../../components/card-clinic";
import { ClinicaAPI } from "../../types";
import NoClinicsPopup from "../filter/noClinicsPopup";

interface MapProps {
  clínicas: ClinicaAPI[];
}

export default function Map({ clínicas }: MapProps) {
  const [clinicasState, setClinicas] = useState<ClinicaAPI[]>(clínicas);
  const [geoData, setGeoData] = useState({ lat: -14.4, lng: -57 });
  const [showNoClinicsPopup, setShowNoClinicsPopup] = useState(false);
  const url = process.env.NEXT_PUBLIC_SERVER_URL;

  const customIcon = new Icon({
    iconUrl: iconPin.src,
    iconSize: [48, 48],
    iconAnchor: [24, 48]
  });

  // Memoize fetchClinicas using useCallback
  const fetchClinicas = useCallback(async () => {
    try {
      const res = await fetch(`${url}/clinics/active`);
      const json = await res.json();
      const data = json.data || [];
      setClinicas(data);
      if (data.length > 0) {
        setGeoData({ lat: data[0].latitude, lng: data[0].longitude });
      }
    } catch (error) {
      console.error("Erro ao buscar clínicas:", error);
    }
  }, [url]); // url is a dependency since it's used inside the function

  async function fetchProximity(filters: {
    address: string;
    radiusInKm: number;
    specialties?: string[];
  }) {
    try {
      const res = await fetch(`${url}/clinics/proximity`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filters)
      });

      if (!res.ok) {
        console.warn("Nenhuma clínica encontrada");
        setClinicas([]);
        setShowNoClinicsPopup(true);
        return;
      }

      const json = await res.json();
      const data = json.data?.clinics || [];
      setClinicas(data);
      setShowNoClinicsPopup(false);
      if (data.length > 0) {
        setGeoData({ lat: data[0].latitude, lng: data[0].longitude });
      }
    } catch (error) {
      console.error("Erro ao buscar clínicas por proximidade:", error);
    }
  }

  useEffect(() => {
    if (clínicas.length > 0) {
      setClinicas(clínicas);
      if (clínicas[0]?.latitude && clínicas[0]?.longitude) {
        setGeoData({ lat: clínicas[0].latitude, lng: clínicas[0].longitude });
      }
    } else {
      fetchClinicas();
    }
  }, [clínicas, fetchClinicas]); // Added fetchClinicas to the dependency array

  const handleClosePopup = () => {
    setShowNoClinicsPopup(false);
  };

  return (
    <div className="pt-24 md:pt-20">
      <ClinicaFilter onFilter={fetchProximity} onClear={fetchClinicas} />
      <MapContainer
        center={[geoData.lat, geoData.lng]}
        zoom={3}
        style={{ height: "80vh", width: "100%", zIndex: "1" }}
        minZoom={3}
        maxBounds={[
          [-90, -180],
          [90, 180]
        ]}
      >
        <LayersControl>
          <LayersControl.BaseLayer name="Light">
            <TileLayer
              url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
              attribution='© OpenStreetMap France | © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              maxZoom={20}
              opacity={1}
              noWrap={true}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Dark">
            <TileLayer
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
              attribution='© <a href="https://stadiamaps.com/">Stadia Maps</a>, © <a href="https://openmaptiles.org/">OpenMapTiles</a> © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
              maxZoom={20}
              noWrap={true}
              opacity={1}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer checked name="Satélite">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
              maxZoom={21}
              minZoom={1}
              noWrap={true}
              opacity={1}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Google">
            <TileLayer
              url="http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}"
              attribution='© <a href="https://www.google.com/help/terms_maps.html">Google</a>'
              maxZoom={21}
              minZoom={1}
              noWrap={true}
              opacity={1}
            />
          </LayersControl.BaseLayer>

          {clinicasState.map((clinica) => {
            const lat = clinica.latitude;
            const lng = clinica.longitude;

            if (!lat || !lng) return null;

            return (
              <Marker key={clinica.id} position={[lat, lng]} icon={customIcon}>
                <Popup className="mapa_popup">
                  <CardClinica
                    clinica={{
                      id: clinica.id,
                      name: clinica.name,
                      address: clinica.address,
                      houseNumber: clinica.houseNumber,
                      neighborhood: clinica.neighborhood,
                      phone: clinica.phone,
                      imagem_url: clinica.imagem_url,
                      healthInsurance: clinica.healthInsurance,
                      avaliacao: clinica.avaliacao
                    }}
                  />
                </Popup>
              </Marker>
            );
          })}
        </LayersControl>
      </MapContainer>
      {showNoClinicsPopup && <NoClinicsPopup onClose={handleClosePopup} />}
    </div>
  );
}
