import { Container } from "@/components/Container";
import FAQItems from "@/components/ui/facItems";
import Link from "next/link";

const SectionThree = () => {
  return (
    <Container>
      <section className=" mt-6 mb-6 bg-[#1C226B] text-white p-8 rounded-3xl flex flex-col md:flex-row items-start justify-between md:items-center">
        <div className="mb-8 md:mb-0 md:mr-8 max-w-md">
          <h2 className="text-lg font-semibold font-Poppins">
            Perguntas e Respostas
          </h2>
          <p className="text-3xl font-bold mt-2 leading-tight font-MuseoModerno">
            Tire suas dúvidas e aproveite ao máximo as funcionalidades do Agenda
            Saúde.
          </p>
          <p className="text-sm mt-4 font-Poppins text-[12px]">
            Não encontrou o que procurava?{" "}
            <Link href={"/"} className="underline text-blue-300">
              Fale com o nosso time
            </Link>
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <FAQItems />
        </div>
      </section>
    </Container>
  );
};

export default SectionThree;
