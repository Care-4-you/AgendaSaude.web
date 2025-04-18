import Link from "next/link";

import { default as LayoutContainer } from "@/components/layout/container";

import AccordionCustom from "../../layout/accordion";

const SectionThree = () => {
  return (
    <section className="p-4">
      <LayoutContainer
        as="div"
        className="grid grid-cols-1 gap-14 rounded-3xl bg-agenda-saude-purple-200 px-11 py-28 lg:grid-cols-2"
      >
        <aside className="flex flex-col items-start justify-center gap-2 text-white">
          <span className="font-poppins text-lg font-semibold">
            Perguntas e Respostas
          </span>
          <h2 className="max-w-[484px] font-museo text-2xl font-bold leading-snug md:text-3xl">
            Tire suas dúvidas e aproveite ao máximo as funcionalidades do Agenda
            Saúde.
          </h2>
          <p className="mt-4 font-poppins text-xs">
            Não encontrou o que procurava?{" "}
            <Link href={"/"} className="text-blue-300 underline">
              Fale com o nosso time
            </Link>
          </p>
        </aside>
        <AccordionCustom />
      </LayoutContainer>
    </section>
  );
};

export default SectionThree;
