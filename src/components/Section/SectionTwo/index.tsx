import { Container } from "@/components/Container";
import ArticleCard from "@/components/ui/articleCard";

const SectionTwo = () => {
  // Dados para os artigos
  const articles = [
    {
      imagePath: "/sectionTwo/1.png",
      title: "Dicas para Manter a Saúde Mental em Dia",
      description:
        "Explore práticas para gerenciar o estresse, melhorar a qualidade de sono e adotar hábitos que fortalecem a saúde mental.",
      href: "/artigo_1"
    },
    {
      imagePath: "/sectionTwo/2.png",
      title: "Como se Preparar para Consultas Médicas: O que Levar e Perguntar",
      description:
        "Um guia prático que ajuda os pacientes a obter o máximo proveito de suas consultas médicas.",
      href: "/artigo_2"
    },
    {
      imagePath: "/sectionTwo/3.png",
      title: "Benefícios da Atividade Física Regular para o Corpo e a Mente",
      description:
        "Como o exercício impacta a saúde física e mental, trazendo resultados positivos em diversos aspectos.",
      href: "/artigo_3"
    },
    {
      imagePath: "/sectionTwo/4.png",
      title: "Principais Exames Preventivos por Faixa Etária",
      description:
        "Um artigo sobre os exames recomendados para cada fase da vida, visando um acompanhamento preventivo eficiente.",
      href: "/artigo_4"
    },
    {
      imagePath: "/sectionTwo/5.png",
      title:
        "Alimentação Saudável: Como Pequenas Mudanças Podem Fazer a Diferença",
      description:
        "Dicas práticas para melhorar a alimentação com mudanças simples e sustentáveis.",
      href: "/artigo_5"
    },
    {
      imagePath: "/sectionTwo/6.png",
      title: "Dicas para Dormir Melhor e Aumentar a Qualidade do Sono",
      description:
        "Explorando hábitos e práticas que ajudam a garantir um sono de qualidade e maior bem-estar.",
      href: "/artigo_6"
    }
  ];

  return (
    <section className="bg-[#E9F9F8] py-16">
      <Container>
        <div className="container mx-auto px-4">
          <h1 className="font-MuseoModerno text-3xl sm:text-4xl font-bold text-black mb-8">
            Artigos
          </h1>

          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-8">
            {articles.map((article, index) => (
              <ArticleCard
                key={index}
                imagePath={article.imagePath}
                title={article.title}
                description={article.description}
                href={article.href}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SectionTwo;
