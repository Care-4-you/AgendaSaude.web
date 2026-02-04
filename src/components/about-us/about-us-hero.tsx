import Image from "next/image";
import care4youLogo from "@/assets/care4you_footer.png";
import Container from "@/components/layout/container";

export default function AboutUsHero() {
  return (
    <section className="bg-white py-12 md:py-20">
      <Container className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <h1 className="font-poppins text-4xl font-bold text-agenda-saude-purple-100 md:text-5xl">
            Sobre nós
          </h1>
          <p className="font-poppins text-lg leading-relaxed text-gray-700 md:text-xl">
            O grupo Care4You teve sua criação oriunda do projeto voluntário
            SouJunior Labs e é responsável pelo desenvolvimento do produto
            Agenda Saúde. O grupo é composto por estudantes de tecnologia,
            desenvolvedores profissionais e pessoas que buscam transição de
            carreira tendo como principal objetivo dar visibilidade a todos
            evoluírem profissionalmente.
          </p>
        </div>
        <div className="flex justify-center md:justify-end">
          <div className="relative h-[300px] w-full max-w-[400px] md:h-[400px]">
            <Image
              src={care4youLogo}
              alt="Care4You Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
