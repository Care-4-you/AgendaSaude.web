import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("@/app/mapa/_components/map"), {
  ssr: false
});

import db from "./_utils/db.json" assert { type: "json" };

import { Filter } from "./_components/filter";

export default function MapPage() {
  return (
    <main>
      <Filter />
      <DynamicMap clinicas={db.clinicas} />
    </main>
  );
}
