"use client";
import Button from "@/components/Button";
import LogoNoLink from "@/components/Logo/LogoNoLink";
import Link from "next/link";

const SectionOne = () => {
  return (
    <div className="bg-[#1C226B] py-16 flex flex-col items-center">
      <h1 className="font-MuseoModerno text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-center">
        Serviços que são feitos no site
      </h1>

      <p className="text-lg text-white mb-8 text-center max-w-3xl">
        Conectando você ao cuidado que importa, com facilidade e confiança
      </p>

      <div className="flex flex-wrap  justify-center gap-4 mb-8 overflow-x-auto px-4">
        <LogoNoLink
          imagePath="/section/1.png"
          height={234}
          width={234}
          className="w-48 h-64 object-cover rounded-md"
        />
        <LogoNoLink
          imagePath="/section/2.png"
          height={234}
          width={234}
          className="w-48 h-64 object-cover rounded-md"
        />
        <LogoNoLink
          imagePath="/section/3.png"
          height={234}
          width={234}
          className="w-48 h-64 object-cover rounded-md"
        />
        <LogoNoLink
          imagePath="/section/4.png"
          height={234}
          width={234}
          className="w-48 h-64 object-cover rounded-md"
        />
      </div>
      <Link href={"/nosso_servicos"}>
        <Button className="bg-[#111928] border-none text-white font-medium px-6 py-3 rounded-full font-Poppins">
          Saiba mais
        </Button>
      </Link>
    </div>
  );
};

export default SectionOne;
