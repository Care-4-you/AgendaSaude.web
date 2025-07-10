import { Filter } from "./_components/filter";

import Map from "./_components/map";

export default function MapPage() {
  return (
    <main>
      <Filter />
      <Map clínicas={[]} />
    </main>
  );
}
