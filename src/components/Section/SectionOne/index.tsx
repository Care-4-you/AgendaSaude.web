import Image from "next/image";
import Link from "next/link";

import image_01 from "@/assets/section/1.png";
import image_02 from "@/assets/section/2.png";
import image_03 from "@/assets/section/3.png";
import image_04 from "@/assets/section/4.png";
import { default as LayoutContainer } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

const SectionOne = () => {
  return (
    <section className="bg-agenda-saude-purple-200 w-full py-16">
      <LayoutContainer
        as="div"
        className="flex flex-col items-center justify-center  gap-16"
      >
        <hgroup className="text-center">
          <h2 className="mb-4 font-museo text-4xl lg:text-6xl font-bold text-white">
            Serviços que são feitos no site
          </h2>
          <p className="font-poppins text-lg font-medium text-white">
            Conectando você ao cuidado que importa, com facilidade e confiança
          </p>
        </hgroup>
        <picture className="mb-8 flex flex-wrap justify-center gap-4 overflow-x-auto px-4">
          <Image alt="image 1" src={image_01} height={234} width={234} />
          <Image alt="image 2" src={image_02} height={234} width={234} />
          <Image alt="imagw 3" src={image_03} height={234} width={234} />
          <Image alt="image 4" src={image_04} height={234} width={234} />
        </picture>
        <Link
          className={cn(
            buttonVariants({ variant: "default" }),
            "rounded-full border-none bg-[#111928] px-8 py-6 font-poppins text-lg font-medium text-white"
          )}
          href={"/nossos-servicos"}
        >
          Saiba mais
        </Link>
      </LayoutContainer>
    </section>
  );
};

export default SectionOne;
