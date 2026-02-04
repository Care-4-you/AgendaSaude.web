import Image from "next/image";
import Link from "next/link";
import { BsGithub, BsInstagram, BsLinkedin } from "react-icons/bs";

import care4youLogo from "@/assets/care4you_footer.png";
import souJuniorIcon from "@/assets/sou_junior_footer.png";
import { default as LayoutContainer } from "@/components/layout/container";

export default function Footer() {
  return (
    <footer className="bg-agenda-saude-purple-100 py-10 md:py-14">
      <LayoutContainer
        as="nav"
        className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:px-20"
      >
        <div className="flex w-full flex-col items-center justify-center gap-6 md:items-start md:justify-start">
          <h2 className="font-poppins text-3xl font-semibold text-white md:text-4xl">
            Produto sem fins lucrativos
          </h2>
          <p className="max-w-xl font-poppins text-sm font-medium text-white md:text-left md:text-base">
            Esse MVP de produto digital é fruto de uma iniciativa do SouJunior
            Labs. Maiores informações:
          </p>
          <Image
            alt="icon sou junior"
            src={souJuniorIcon}
            width={450}
            height={173}
            className="w-full max-w-[350px] md:max-w-[450px]"
          />
          <ul className="flex gap-6">
            <li>
              <Link
                href="https://www.linkedin.com/company/soujunior-labs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition-colors duration-200 hover:text-gray-200"
              >
                <BsLinkedin size={32} />
              </Link>
            </li>
            <li>
              <Link
                href="https://github.com/SouJunior-Labs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition-colors duration-200 hover:text-gray-200"
              >
                <BsGithub size={32} />
              </Link>
            </li>
            <li>
              <Link
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition-colors duration-200 hover:text-gray-200"
              >
                <BsInstagram size={32} />
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex justify-center md:justify-end">
          <Image
            alt="icon sou care 4 you"
            src={care4youLogo}
            width={380}
            height={380}
            className="w-full max-w-[280px] md:max-w-[380px]"
          />
        </div>
      </LayoutContainer>
    </footer>
  );
}
