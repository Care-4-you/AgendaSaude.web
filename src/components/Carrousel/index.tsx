"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Page {
  title: string;
  content: string;
  linkTo: string;
  customButtonName: string;
}

const Carousel: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const pages: Page[] = [
    {
      title: "Pacientes",
      content: "Para você que deseja pesquisar uma clínica ou consultório especialista perto de você e agendar uma consulta em poucos cliques.",
      linkTo: "/map",
      customButtonName: "Busque clínicas e consultório.",
    },
    {
      title: "Médicos",
      content: "Em um único lugar é possível gerenciar sua agenda de atendimento, o histórico de tratamento de seus pacientes e facilitar sua organização diária.",
      linkTo: "/",
      customButtonName: "Facilite sua agenda e históricos de tratamento de seus pacientes.",
    },
    {
      title: "Clínicas",
      content: "Através do Agenda Saúde será possível aumentar o alcance de sua clínica em sua região e ter acesso a algumas funcionalidades que simplificará o dia a dia de seu negócio.",
      linkTo: "/",
      customButtonName: "Aumente suas base de clientes e sua eficiência.",
    },
  ];

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    const nextPage = (currentPage % 3) + 1;
    setCurrentPage(nextPage);
  };

  const handlePrevPage = () => {
    const prevPage = currentPage === 1 ? 3 : currentPage - 1;
    setCurrentPage(prevPage);
  };

  // Função para atribuir intervalo de cada página do carrossel
  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNextPage();
    }, 5000);

    return () => clearInterval(intervalId); // Limpa o intervalo ao desmontar o componente
  }, [currentPage]);

  return (
    <div style={{ position: "relative" }}>
      <div>
        {pages.map((page, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            style={{
              backgroundColor: currentPage === index + 1 ? "lightblue" : "white",
              border: "1px solid black",
              margin: "5px",
            }}
          >
            {page.title}
          </button>
        ))}
      </div>
      <div>
        <h2>{pages[currentPage - 1].title}</h2>
        <p>{pages[currentPage - 1].content}</p>
        <button>
          <Link href={pages[currentPage - 1].linkTo}>{pages[currentPage - 1].customButtonName}</Link>
        </button>
      </div>

      {/* Botões para avançar e retroceder */}
      <button onClick={handlePrevPage}>
        &lt;
      </button>
      <button onClick={handleNextPage}>
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
