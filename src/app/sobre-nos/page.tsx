import AboutUsHero from "@/components/about-us/about-us-hero";
import TeamSection from "@/components/about-us/team-section";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-white">
      <AboutUsHero />
      <TeamSection />
    </main>
  );
}
