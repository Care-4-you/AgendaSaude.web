import Carrousel from "@/components/Carrousel";
import SectionOne from "@/components/Section/SectionOne";
import SectionThree from "@/components/Section/SectionThree";
import SectionTwo from "@/components/Section/SectionTwo";

export default function Home() {
  return (
    <main className="min-h-screen bg-agenda-saude-blue-100">
      <Carrousel />
      <SectionOne />
      <SectionTwo />
      <SectionThree />
    </main>
  );
}
