import Carrousel from "@/components/Carrousel";

import SectionOne from "@/components/Section/SectionOne";
import SectionThree from "@/components/Section/SectionThree";
import SectionTwo from "@/components/Section/SectionTwo";

export default function Home() {
  return (
    <div>
      <Carrousel />
      <SectionOne />
      <SectionTwo />
      <SectionThree />
    </div>
  );
}
