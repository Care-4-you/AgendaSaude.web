"use client";
import { useState, useEffect, useRef } from "react";
import { TbChevronCompactRight, TbChevronCompactLeft } from "react-icons/tb";

import Button from "../Button";
import { Container } from "../Container";
import LogoNoLink from "../Logo/LogoNoLink";

interface Page {
  tab: string;
  title: string;
  content: string;
  linkTo: string;
  customButtonName: string;
  image: string;
}

const Carousel: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const shouldClearIntervalRef = useRef<boolean>(false);
  const intervalRef = useRef<number | null>(null);

  const pages: Page[] = [
    {
      tab: "Paciente",
      title: "Encontre o cuidado que precisa, sem complicações",
      content:
        "Agende consultas com profissionais de saúde perto de você, com informações transparentes e preços acessíveis. A sua saúde em primeiro lugar, com facilidade e segurança.",
      linkTo: "/map",
      customButtonName: "ENCONTRAR CLÍNICAS",
      image: "/paciente.png"
    },
    {
      tab: "Médico",
      title: "Amplie sua presença e conquiste novos pacientes",
      content:
        "Gerencie sua agenda de forma eficiente e expanda sua rede de atendimentos. Facilite a comunicação e ofereça um serviço de excelência aos seus pacientes.",
      linkTo: "/",
      customButtonName: "",
      image: "/medico.png"
    },
    {
      tab: "Clinica",
      title: "Potencialize a gestão e otimize os atendimentos",
      content:
        "Organize seus serviços, aumente a visibilidade da sua clínica e melhore a experiência dos pacientes com uma plataforma intuitiva e eficaz.",
      linkTo: "/",
      customButtonName: "",
      image: "/clinica.png"
    }
  ];

  const handlePageChange = (pageNumber: number) => {
    shouldClearIntervalRef.current = true;
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
  useEffect(() => {
    if (!intervalRef.current && !shouldClearIntervalRef.current) {
      intervalRef.current = window.setInterval(() => {
        handleNextPage();
      }, 10000);
    }
    if (shouldClearIntervalRef.current && intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      shouldClearIntervalRef.current = false;
    }
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [currentPage]);

  return (
    <Container>
      <section className=" w-full items-center flex justify-center pt-14 ">
        <div className=" relative  flex    w-full max-w-7xl flex-col   items-center justify-between  gap-12 p-12  md:items-start">
          <div className="flex w-auto items-center justify-center rounded-full border border-slate-400  overflow-hidden">
            {pages.map((page, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2   border-l border-slate-400  ${
                  currentPage === index + 1
                    ? " bg-[#1C226B] text-white"
                    : "bg-white text-slate-900"
                }  `}
              >
                {page.tab}
              </button>
            ))}
          </div>
          <div className="  min-h-[400px] flex  flex-col items-center justify-center gap-8 md:flex-row md:gap-0">
            <div className="flex flex-col justify-between  md:w-7/12">
              <h2 className="mb-10 font-MuseoModerno  text-3xl font-semibold leading-tight text-black sm:text-4xl md:text-5xl">
                {pages[currentPage - 1].title}
              </h2>
              <p className=" font-mono text-xl font-medium tracking-tight text-black">
                {pages[currentPage - 1].content}
              </p>
              <div className="flex mt-7 justify-center md:justify-start sm:items-center">
                {pages[currentPage - 1].customButtonName !== "" && (
                  <Button
                    href={pages[currentPage - 1].linkTo}
                    className=" h-16 w-auto rounded-full px-8 py-4 text-lg font-bold md:text-xl lg:text-2xl text-center bg-[#111928] text-white font-Poppins "
                  >
                    {pages[currentPage - 1].customButtonName}
                  </Button>
                )}
              </div>
            </div>
            <div>
              <LogoNoLink
                width={433}
                height={494}
                imagePath={pages[currentPage - 1].image}
              />
            </div>
          </div>
          <div className="hidden md:flex gap-8">
            {" "}
            <Button
              className="-left-14 top-[17rem] xl:absolute"
              variant="plain"
              leftAccessory={<TbChevronCompactLeft size={48} color="#1C226B" />}
              onClick={handlePrevPage}
            />
            <Button
              className="-right-14 top-[17rem] xl:absolute"
              variant="plain"
              rightAccessory={
                <TbChevronCompactRight size={48} color="#1C226B" />
              }
              onClick={handleNextPage}
            />
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Carousel;
