import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

function AccordionCustom() {
  const content = [
    {
      question: "Como posso agendar uma consulta pelo Agenda Saúde?",
      replay:
        "Você pode agendar sua consulta diretamente pelo aplicativo ou pelo site, selecionando a data e horário desejados. "
    },
    {
      question: "O Agenda Saúde oferece a opção de teleconsulta?",
      replay:
        "Atualmente, o Agenda Saúde não oferece a opção de teleconsulta. No entanto, estamos avaliando a possibilidade de incluir essa modalidade no futuro. "
    },
    {
      question: "Como entro em contato com o suporte do Agenda Saúde?",
      replay:
        "Você pode entrar em contato com o suporte do Agenda Saúde em dias úteis, das 9h às 19h, pelo e-mail care4you.lab.soujunior@gmail.com. Estamos à disposição para ajudar!"
    },
    {
      question: "Posso cancelar ou remarcar uma consulta?",
      replay:
        "Sim, basta acessar a consulta na sua agenda e escolher a opção de cancelar ou remarcar."
    },
    {
      question: "Posso fazer o pagamento da consulta pelo aplicativo?",
      replay:
        "O Agenda Saúde ajuda você a encontrar profissionais, visualizar os valores das consultas com transparência e agendar atendimentos médicos especializados. No entanto, o pagamento deve ser realizado diretamente com a clínica ou consultório no momento do atendimento."
    }
  ];
  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {content.map((item, index) => (
        <AccordionItem
          value={`item-${index}`}
          key={`item-${index}`}
          className="rounded-lg bg-white px-4 py-1"
        >
          <AccordionTrigger className="bg flex items-center gap-2 hover:no-underline [&>svg]:stroke-agenda-saude-purple-100">
            <div className="flex items-center justify-center gap-4 font-semibold text-slate-800">
              <HiOutlineChatBubbleLeftRight
                size={24}
                className="text-agenda-saude-purple-100"
              />
              <p className="">{item.question}</p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-sm text-gray-700">
            {item.replay}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
export default AccordionCustom;
