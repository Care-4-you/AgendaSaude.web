import Image from "next/image";
import Link from "next/link";

import image_1 from "@/assets/sectionTwo/1.png";
import image_2 from "@/assets/sectionTwo/2.png";
import image_3 from "@/assets/sectionTwo/3.png";
import image_4 from "@/assets/sectionTwo/4.png";
import image_5 from "@/assets/sectionTwo/5.png";
import image_6 from "@/assets/sectionTwo/6.png";

const articles = [
  {
    imagePath: image_1,
    title: "Dicas para Manter a Saúde Mental em Dia",
    description:
      "Explore práticas para gerenciar o estresse, melhorar a qualidade de sono e adotar hábitos que fortalecem a saúde mental.",
    href: "/artigo/1"
  },
  {
    imagePath: image_2,
    title: "Como se Preparar para Consultas Médicas: O que Levar e Perguntar",
    description:
      "Um guia prático que ajuda os pacientes a obter o máximo proveito de suas consultas médicas.",
    href: "/artigo/2"
  },
  {
    imagePath: image_3,
    title: "Benefícios da Atividade Física Regular para o Corpo e a Mente",
    description:
      "Como o exercício impacta a saúde física e mental, trazendo resultados positivos em diversos aspectos.",
    href: "/artigo/3"
  },
  {
    imagePath: image_4,
    title: "Principais Exames Preventivos por Faixa Etária",
    description:
      "Um artigo sobre os exames recomendados para cada fase da vida, visando um acompanhamento preventivo eficiente.",
    href: "/artigo/4"
  },
  {
    imagePath: image_5,
    title:
      "Alimentação Saudável: Como Pequenas Mudanças Podem Fazer a Diferença",
    description:
      "Dicas práticas para melhorar a alimentação com mudanças simples e sustentáveis.",
    href: "/artigo/5"
  },
  {
    imagePath: image_6,
    title: "Dicas para Dormir Melhor e Aumentar a Qualidade do Sono",
    description:
      "Explorando hábitos e práticas que ajudam a garantir um sono de qualidade e maior bem-estar.",
    href: "/artigo/6"
  }
];

export default function ArticleCard() {
  return (
    <>
      {articles.map((article, index) => (
        <div
          className="flex cursor-pointer flex-col gap-4 sm:flex-row"
          key={index}
        >
          <Link href={article.href}>
            <Image
              src={article.imagePath}
              alt={article.title}
              className="w-full rounded-md object-cover sm:w-64"
              height={250}
            />
          </Link>

          <div className="flex-1">
            <h2 className="text-lg font-bold text-black sm:text-xl">
              {article.title}
            </h2>
            <p className="text-sm text-gray-700 sm:text-base">
              {article.description}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
