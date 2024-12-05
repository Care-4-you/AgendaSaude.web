import Link from "next/link";

const SectionThree = () => {
  return (
    <div className="bg-white p-10">
      <div className="flex w-full max-w-4xl bg-[#1C226B] rounded-3xl">
        <div className="w-auto h-[650px] ">
          <h3 className="text-white font-Poppins">Perguntas e Respostas</h3>
          <h1 className="text-white font-MuseoModerno">
            Tire suas dúvidas e aproveite ao máximo as funcionalidades do Agenda
            Saúde.
          </h1>
          <p className="text-white font-Poppins">
            Não encontrou o que procurava?{" "}
            <Link href={"/"}>Fale com o nosso time</Link>
          </p>
        </div>
        {/* Pop-Up */}
        <div>
          <h1>Pop up</h1>
        </div>
      </div>
    </div>
  );
};

export default SectionThree;
