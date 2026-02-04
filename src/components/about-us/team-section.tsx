import cleitonPhoto from "@/assets/team/cleiton.jpeg";
import gabrielPhoto from "@/assets/team/gabriel.png";
import igorPhoto from "@/assets/team/igor.jpeg";
import manuPhoto from "@/assets/team/manu.png";
import Container from "@/components/layout/container";

import AboutUsCard from "./about-us-card";

const teamMembers = [
  {
    name: "Igor Calmon",
    role: "Developer",
    bio: "Transformando ideias em código eficiente e soluções escaláveis para o Agenda Saúde.",
    photoUrl: igorPhoto.src,
    linkedinUrl: "https://www.linkedin.com/in/igor-calmon",
    githubUrl: "https://github.com/igorcalmon",
  },
  {
    name: "Emanuelle Maria",
    role: "QA Engineer",
    bio: "Garantindo a qualidade e excelência em cada funcionalidade entregue pelo time.",
    photoUrl: manuPhoto.src,
    linkedinUrl: "https://www.linkedin.com/in/emanuelle-mariz-qa/",
    githubUrl: "https://github.com/emanuellemariz",
  },
  {
    name: "Gabriel Mello",
    role: "Developer",
    bio: "Apaixonado por tecnologia e em constante evolução para impactar vidas positivamente.",
    photoUrl: gabrielPhoto.src,
    linkedinUrl: "https://www.linkedin.com/in/gabrielmellomoraes/",
    githubUrl: "https://github.com/GabrielMello1407",
  },
  {
    name: "Cleiton Barros",
    role: "Developer",
    bio: "Construindo pontes entre tecnologia e inovação no projeto Agenda Saúde.",
    photoUrl: cleitonPhoto.src,
    linkedinUrl: "https://www.linkedin.com/in/cleitonbarrosmoura/",
    githubUrl: "https://github.com/cleitonBarros",
  },
  {
    name: "Gabrielle Rosa",
    role: "Developer",
    bio: "Dedicada a criar soluções que fazem a diferença no dia a dia da comunidade.",
    photoUrl: "https://github.com/Gaburiiere.png",
    linkedinUrl: "https://www.linkedin.com/in/gabriellenprosa/",
    githubUrl: "https://github.com/Gaburiiere",
  },
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
            const rotation = (index % 3 === 0 ? -1.5 : index % 2 === 0 ? 1.5 : -0.5);
            
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
