import Image from "next/image";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

import imagebg from "@/assets/articleImage/1.png";
import { default as LayoutContainer } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

const services = [
  {
    group: "Pacientes",
    items: [
      {
        description:
          "Busca de Clínicas e Médicos: Pesquise por profissionais e clínicas próximas com base na localização, especialidade e disponibilidade."
      },
      {
        description:
          "Agendamento de Consultas: Agende consultas de forma rápida e segura, visualizando horários disponíveis e preços antes de confirmar."
      },
      {
        description:
          "Transparência nos Valores: Acesso aos valores das consultas antes de agendar, permitindo escolhas adequadas ao orçamento."
      },
      {
        description:
          " Histórico de Consultas: Acompanhe um histórico dos agendamentos e consultas realizadas para fácil referência."
      }
    ]
  },
  {
    group: "Médicos",
    items: [
      {
        description:
          "Gestão de Agenda: Organize e visualize facilmente a agenda de atendimentos, permitindo ajustes rápidos e controle dos horários disponíveis."
      },
      {
        description:
          "Gerenciamento de Pacientes: Tenha acesso a um histórico dos pacientes atendidos, facilitando a continuidade e o planejamento dos atendimentos."
      },
      {
        description:
          "Divulgação de Serviços: Promova seu perfil para aumentar a visibilidade e atrair mais pacientes da região."
      },
      {
        description:
          "Controle de Valores e Recebimentos: Configure valores dos serviços e acompanhe os agendamentos, com controle transparente sobre consultas realizadas e recebidas."
      }
    ]
  },
  {
    group: "Clínicas",
    items: [
      {
        description:
          "Centralização de Agenda dos Profissionais: Gerencie a agenda de todos os profissionais da clínica em um único lugar, permitindo otimizar horários e fluxo de atendimentos."
      },
      {
        description:
          "Gestão de Pacientes: Acompanhe o histórico de pacientes que frequentam a clínica, facilitando o atendimento e garantindo continuidade."
      },
      {
        description:
          "Transparência e Divulgação: Divulgue os valores dos serviços e horários de atendimento da clínica, garantindo que os pacientes encontrem facilmente o que procura."
      },
      {
        description:
          "Aumento da Visibilidade: Posicione a clínica para que novos pacientes a encontrem ao buscar por especialidades e localização."
      }
    ]
  }
];
export default function OursServicesPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between bg-agenda-saude-blue-100 ">
      <div className="relative w-full overflow-hidden">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "default", size: "icon" }),
            "absolute left-5 top-5 z-[99] bg-black/80  p-3 shadow-md sm:hidden"
          )}
        >
          <IoIosArrowBack size={32} />
        </Link>
        <div className="relative h-[740px] w-full">
          <Image
            src={imagebg}
            alt={"Imagem de fundo"}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="z-50 -mt-[100px] mb-8 flex items-center justify-center px-8">
        <LayoutContainer>
          <div className="flex w-full flex-col items-start justify-between gap-4 rounded-3xl bg-agenda-saude-purple-200 p-10">
            <h1 className="max-w-max rounded-full bg-[#4AA9AF] bg-opacity-70 px-8 py-2 font-museo font-medium text-white sm:text-lg lg:text-xl xl:text-2xl">
              Nossos Serviços
            </h1>

            <p className="font-poppins text-base font-normal text-white md:text-xl xl:text-2xl">
              Os serviços do site são focados em facilitar a conexão entre
              pacientes, médicos e clínicas, oferecendo funcionalidades para
              tornar o acesso à saúde mais simples e organizado. Aqui estão os
              principais serviços que o site pode oferecer para cada grupo de
              usuário:
            </p>

            {services.map((service, index) => (
              <ol
                className="list-inside list-decimal space-y-2 font-poppins text-base text-white xl:text-xl"
                key={index}
              >
                <li className="ml-2">{service.group}</li>
                {service.items.map((item, index) => (
                  <ul className="list-disc" key={index}>
                    <li className="ml-14">{item.description}</li>
                  </ul>
                ))}
              </ol>
            ))}

            <p className="font-poppins text-base text-white xl:text-xl">
              Esses serviços tornam o site um facilitador de acesso e gestão na
              área da saúde, atraindo tanto pacientes quanto profissionais e
              clínicas para uma experiência única.
            </p>
          </div>
        </LayoutContainer>
      </div>
    </main>
  );
}
