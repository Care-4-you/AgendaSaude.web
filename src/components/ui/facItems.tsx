"use client";
import { useState } from "react";
import Button from "../Button";
import LogoNoLink from "../Logo/LogoNoLink";
import { ChevronDown, ChevronUp } from "lucide-react";

const questionsAndAnswers = [
  {
    question: "Como posso agendar uma consulta pelo Agenda Saúde?",
    answer:
      "Você pode agendar sua consulta diretamente pelo aplicativo ou pelo site, selecionando a data e horário desejados."
  },
  {
    question: "O Agenda Saúde oferece a opção de teleconsulta?",
    answer:
      "Sim, você pode realizar consultas online com nossos profissionais pelo aplicativo."
  },
  {
    question: "Como entro em contato com o suporte do Agenda Saúde?",
    answer:
      "Nosso suporte está disponível pelo chat no aplicativo ou pelo telefone 0800-123-456."
  },
  {
    question: "Posso cancelar ou remarcar uma consulta?",
    answer:
      "Sim, basta acessar a consulta na sua agenda e escolher a opção de cancelar ou remarcar."
  },
  {
    question: "Posso fazer o pagamento da consulta pelo aplicativo?",
    answer:
      "Sim, aceitamos pagamentos via cartão de crédito e PIX diretamente no aplicativo."
  }
];

const FAQItems = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {questionsAndAnswers.map((item, index) => (
        <div
          key={index}
          className="bg-white text-black rounded-lg p-4 shadow-md"
        >
          <Button
            onClick={() => toggleAnswer(index)}
            className="w-full flex justify-between items-center font-semibold bg-white border-none hover:bg-white"
          >
            <div className="flex items-center space-x-2">
              <LogoNoLink
                height={20.5}
                width={21}
                imagePath="/message_icon.svg"
              />
              <span>{item.question}</span>
              <span>
                {openIndex === index ? <ChevronUp /> : <ChevronDown />}
              </span>
            </div>
          </Button>
          <div
            className={`overflow-hidden transition-[max-height] duration-300 ${
              openIndex === index ? "max-h-40" : "max-h-0"
            }`}
          >
            <p className="mt-2 text-sm text-gray-700">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQItems;
