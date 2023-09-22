/* eslint-disable @typescript-eslint/no-unused-vars */
import { IClinica } from "@/shared/interfaces/IClinica";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

interface CardClinicaProps {
  clinica: IClinica;
}

export default function CardClinica({ clinica }: CardClinicaProps) {
  function renderStars(avaliacao: number) {
    const inteiro = Math.trunc(avaliacao);
    const decimal = avaliacao - inteiro;

    const result = [];
    // adiciona estrelas cheias.
    for (let i = 0; i < inteiro; i++) {
      result.push(<BsStarFill key={result.length} />);
    }
    // adiciona estrela pela metade caso o decimal seja maior ou igual a 0.5, ou vazia, caso seja menor.
    if (decimal !== 0) {
      decimal < 0.5
        ? result.push(<BsStar key={result.length} />)
        : result.push(<BsStarHalf key={result.length} />);
    }

    // completa o restante das 5 estrelas com estrelas vazias.
    while (result.length < 5) {
      result.push(<BsStar key={result.length} />);
    }
    return result;
  }
  return (
    <div className="m-0 w-48 overflow-hidden p-0">
      <img src={clinica.imagem_url} alt="" className="rounded-t-xl" />
      <div className="p-2">
        <h3 className=" font-bold">{clinica.nome}</h3>
        <div className="flex h-fit items-center gap-1">
          <p>{clinica.avaliacao}</p>
          <div className="flex items-center">
            {renderStars(clinica.avaliacao!)}
          </div>
          <p>(50)</p>
        </div>
        <h6>{clinica.titulo}</h6>
      </div>
    </div>
  );
}
