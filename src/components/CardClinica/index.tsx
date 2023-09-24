/* eslint-disable @typescript-eslint/no-unused-vars */
import { IClinica } from "@/shared/interfaces/IClinica";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import Botao from "../Botao";

interface CardClinicaProps {
  clinica: IClinica;
}

export default function CardClinica({ clinica }: CardClinicaProps) {
  // Código que adiciona funcionalidade de estrelas ao card, pronto para ser disponibilizado em novas versões
  function renderStars(avaliacao: number) {
    const inteiro = Math.trunc(avaliacao);
    const decimal = avaliacao - inteiro;

    const result = [];
    // adiciona estrelas cheias.
    for (let i = 0; i < inteiro; i++) {
      result.push(<BsStarFill key={result.length} color="#f1af09" />);
    }
    // adiciona estrela pela metade caso o decimal seja maior ou igual a 0.5, ou vazia, caso seja menor.
    if (decimal !== 0) {
      decimal < 0.5
        ? result.push(<BsStar key={result.length} color="#f1af09" />)
        : result.push(<BsStarHalf key={result.length} color="#f1af09" />);
    }

    // completa o restante das 5 estrelas com estrelas vazias.
    while (result.length < 5) {
      result.push(<BsStar key={result.length} color="#f1af09" />);
    }
    return result;
  }

  return (
    <div className="m-0 w-48 overflow-hidden p-0">
      <img src={clinica.imagem_url} alt="" className="rounded-t-xl" />
      <div className="p-2">
        <div className="mb-2">
          <h3 className=" font-bold">{clinica.nome}</h3>
          {
            // Código que adiciona funcionalidade de estrelas ao card, pronto para ser disponibilizado em novas versões
            /* <div className="flex h-fit items-center gap-1">
            <p>{clinica.avaliacao}</p>
            <div className="flex items-center">
              {renderStars(clinica.avaliacao!)}
            </div>
            <p>(50)</p>
          </div> */
          }
          <h6>{clinica.titulo}</h6>
        </div>
        <Botao texto="Agendar" />
      </div>
    </div>
  );
}
