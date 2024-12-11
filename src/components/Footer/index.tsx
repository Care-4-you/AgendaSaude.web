import Image from "next/image";
import TeamMember from "../ui/TeamMember";
import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-[#3E31AE]  text-white py-8 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-[40px] font-semibold">
            Produto sem fins lucrativos
          </h3>
          <p className="text-lg font-medium">
            Este MVP de produto digital é fruto de uma iniciativa do SouJunior
            Labs. Mais informações:
          </p>
          <Image
            src="/sou_junior_footer.png"
            alt="SouJunior Logo"
            width={400}
            height={154}
          />
          <div className="flex justify-start space-x-4 pt-4">
            <Link
              href="https://www.linkedin.com/company/soujunior-labs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#3E31AE] transition-colors duration-200"
            >
              <BsLinkedin size={34.6} />
            </Link>
            <Link
              href="https://github.com/SouJunior-Labs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#3E31AE] transition-colors duration-200"
            >
              <BsGithub size={34.6} />
            </Link>
          </div>
        </div>

        <div className="space-y-2 col-span-1">
          <h3 className="text-4xl font-semibold">
            Time de desenvolvimento do projeto
          </h3>
          <div className="flex flex-wrap  gap-6 items-center">
            <div className="space-y-3 flex-1">
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
            </div>

            <div className="flex justify-center md:justify-end flex-shrink-0">
              <Image
                src="/care4you_footer.png"
                alt="Care4You Logo"
                width={300}
                height={300}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
