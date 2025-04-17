import Image from "next/image";
import Link from "next/link";
import { BsGithub, BsInstagram, BsLinkedin } from "react-icons/bs";

import care4youLogo from "@/assets/care4you_footer.png";
import souJuniorIcon from "@/assets/sou_junior_footer.png";
import { default as LayoutContainer } from "@/components/layout/container";

import TeamMember from "./team-member";

export default function Footer() {
  return (
    <footer className="bg-agenda-saude-purple-100 py-6">
      <LayoutContainer
        as="nav"
        className="grid grid-cols-1 gap-8 md:grid-cols-2"
      >
        <div className="flex w-full flex-col items-center justify-center gap-4 md:items-start md:justify-start">
          <h2 className="self-center text-center font-poppins text-4xl font-semibold text-white">
            Produto sem fins lucrativos
          </h2>
          <p className="max-w-sm self-center text-center font-poppins text-lg font-medium text-white">
            Este MVP de produto digital é fruto de uma iniciativa do SouJunior
            Labs. Mais informações:
          </p>
          <Image
            alt="icon sou junior"
            src={souJuniorIcon}
            width={400}
            height={154}
          />
          <ul className="flex gap-4">
            <li>
              <Link
                href="https://www.linkedin.com/company/soujunior-labs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition-colors duration-200"
              >
                <BsLinkedin size={32} />
              </Link>
            </li>
            <li>
              <Link
                href="https://github.com/SouJunior-Labs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition-colors duration-200"
              >
                <BsGithub size={32} />
              </Link>
            </li>
            <li>
              <Link
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition-colors duration-200"
              >
                <BsInstagram size={32} />
              </Link>
            </li>
          </ul>
        </div>
        <div className="">
          <h2 className="mb-4 text-center text-4xl font-semibold text-white md:text-left">
            Time de desenvolvimento do projeto
          </h2>
          <div className="grid grid-cols-1 items-center justify-items-center md:grid-cols-2">
            <ul className="flex w-full flex-col items-center justify-center">
              <TeamMember
                name="Igor Calmon"
                linkedinUrl="https://www.linkedin.com/in/igor-calmon"
                githubUrl="https://github.com/igorcalmon"
              />
              <TeamMember
                name="Pedro Oliveira"
                linkedinUrl="https://www.linkedin.com/in/pedro-augusto-silva-de-oliveira/"
                githubUrl="https://github.com/pedroasdoliveira"
              />
              <TeamMember
                name="Emanuelle Maria"
                linkedinUrl="https://www.linkedin.com/in/emanuelle-mariz-qa/"
                githubUrl="https://github.com/emanuellemariz"
              />
              <TeamMember
                name="Gabriel Mello"
                linkedinUrl="https://www.linkedin.com/in/gabrielmellomoraes/"
                githubUrl="https://github.com/GabrielMello1407"
              />
              <TeamMember
                name="Cleiton Barros"
                linkedinUrl="https://www.linkedin.com/in/cleitonbarrosmoura/"
                githubUrl="https://github.com/cleitonBarros"
              />
              <TeamMember
                name="Gabrielle Rosa"
                linkedinUrl="https://www.linkedin.com/in/gabriellenprosa/"
                githubUrl="https://github.com/Gaburiiere"
              />
            </ul>
            <Image
              alt="icon sou care 4 you"
              src={care4youLogo}
              width={300}
              height={300}
            />
          </div>
        </div>
      </LayoutContainer>
    </footer>
  );
}
