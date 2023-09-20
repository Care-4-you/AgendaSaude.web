/* eslint-disable @typescript-eslint/no-unused-vars */
import { IClinica } from "@/shared/interfaces/IClinica";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";


interface CardClinicaProps {
  clinica: IClinica
}

export default function CardClinica({clinica}: CardClinicaProps) {
  return (
    <div className="p-0 m-0 overflow-hidden w-48">
      <img src={clinica.imagem_url} alt="" className="rounded-t-xl"/>
      <div className="p-2">
        <h3 className=" font-bold">{clinica.nome}</h3>
        <div className="flex items-center gap-1 h-fit">
          <p>{clinica.avaliacao}</p>
          <div className="flex items-center">
            <BsStarFill />
            <BsStarFill />
            <BsStarFill />
            <BsStarFill />
            {/* <BsStarHalf /> */}
            <BsStar />
          </div>
          <p>(50)</p>
        </div>
        <h6>{clinica.titulo}</h6>

      </div>
    </div>
  );
}
