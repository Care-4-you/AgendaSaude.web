import cleitonPhoto from "@/assets/team/cleiton.jpeg";
import gabiPhoto from "@/assets/team/gabi.jpeg";
import gabrielPhoto from "@/assets/team/gabriel.png";
import igorPhoto from "@/assets/team/igor.jpeg";
import manuPhoto from "@/assets/team/manu.png";
import Container from "@/components/layout/container";

import AboutUsCard from "./about-us-card";

const teamMembers = [
  {
    name: "Igor Calmon",
    role: "Aglista e PO",
    bio: "Profissional com base Agile e foco em ROI, processos eficientes e entrega de valor.",
    photoUrl: igorPhoto.src,
    linkedinUrl: "https://www.linkedin.com/in/igor-calmon",
    githubUrl: "https://github.com/igorcalmon"
  },
  {
    name: "Emanuelle Mariz",
    role: "QA Engineer",
    bio: "Profissional estratégica com foco em processos e na entrega de valor ao negócio.",
    photoUrl: manuPhoto.src,
    linkedinUrl: "https://www.linkedin.com/in/emanuelle-mariz-qa/",
    githubUrl: "https://github.com/emanuellemariz"
  },
  {
    name: "Gabriel Mello",
    role: "Frontend Developer",
    bio: "Profissional técnico, com visão de negócio e focado em novas tecnologias.",
    photoUrl: gabrielPhoto.src,
    linkedinUrl: "https://www.linkedin.com/in/gabrielmellomoraes/",
    githubUrl: "https://github.com/GabrielMello1407"
  },
  {
    name: "Cleiton Barros",
    role: "Frontend Developer",
    bio: "Profissional focado em converter problemas em soluções técnicas eficazes.",
    photoUrl: cleitonPhoto.src,
    linkedinUrl: "https://www.linkedin.com/in/cleitonbarrosmoura/",
    githubUrl: "https://github.com/cleitonBarros"
  },
  {
    name: "Gabrielle Rosa",
    role: "UI/UX Designer",
    bio: "Profissional focada em criar jornadas de alto impacto e valor real para o negócio.",
    photoUrl: gabiPhoto.src,
    linkedinUrl: "https://www.linkedin.com/in/gabriellenprosa/",
    githubUrl: "https://github.com/Gaburiiere"
  }
];

export default function TeamSection() {
  return (
    <section className="bg-zinc-50 py-16 md:py-24">
      <Container>
        <h2 className="mb-16 text-center font-poppins text-4xl font-bold text-agenda-saude-purple-100">
          Nosso time
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => {
            // Subtle rotation between -2 and 2 degrees
            const rotation =
              index % 3 === 0 ? -1.5 : index % 2 === 0 ? 1.5 : -0.5;

            return (
              <AboutUsCard
                key={member.name}
                {...member}
                isImageRight={index % 2 !== 0}
                rotation={rotation}
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
}
