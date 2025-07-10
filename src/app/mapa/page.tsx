import dynamic from "next/dynamic";
import db from "./_utils/db.json" assert { type: "json" };
import { Filter } from "./_components/filter";
import { ClinicaAPI } from "./types";

const clinicasData: { clínicas: ClinicaAPI[] } = db;

const DynamicMap = dynamic(() => import("@/app/mapa/_components/map"), {
  ssr: false
});

export default function MapPage() {
  return (
    <main>
      <Filter />
      <DynamicMap clínicas={clinicasData.clínicas} />
    </main>
  );
}
