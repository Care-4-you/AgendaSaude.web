"use client";
import Link from "next/link";
import Botao from "../Botao";
import Modal from "../RegisterModal";
import Logo from "../Logo";
import { useState } from "react";
import { CiUser } from "react-icons/ci";
import { TbUserHeart } from "react-icons/tb";
import { FaClinicMedical } from "react-icons/fa";
import Button from "../Button";


export default function Navbar() {
  const [modalAberto, setModalAberto] = useState(false);

  const abrirModal = () => {
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
  };
  return (
    <nav className="p-4 bg-slate-600">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <ul className="flex space-x-4">
            <li className="list-none text-white text-xl font-bold">
              <Logo imagePath="/caminho/da/imagem.png"/>
            </li>
          </ul>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Button className="bg-blue-300" variant="filled" onClick={abrirModal}>
              Cadastrar
            </Button>
          </li>
          <li>
            <Link href="#">
              <Botao texto="Entrar" />
            </Link>
          </li>
        </ul>
        <Modal isOpen={modalAberto} onClose={fecharModal}>
          {/* Conteúdo do Modal */}
          <button className="bg-red-500 text-white py-2 px-4 rounded"  onClick={fecharModal}>X</button>
          <h1 className="font-bold">Cadastrar</h1>
          <p>Lorem ipsum dolor sit amet consectetur.</p>
          <div className="flex">
            <button className="mr-4 flex bg-slate-300">
              <div className="pr-4">
                <CiUser className="text-5xl"/>
              </div>
              <p className="font-bold">Paciente</p>
              <p>Lorem ipsum dolor sit amet consectetur</p>
            </button>

            <button className="mr-4 flex  bg-slate-300">
              <div className="pr-4">
                <TbUserHeart className="text-5xl"/>
              </div>
              <p className="font-bold">Médico</p>
              <p>Lorem ipsum dolor sit amet consectetur</p>
            </button>

            <Link href='/registerClinical'>
              <button className="mr-4 flex  bg-slate-300">
                <div className="pr-4">
                  <FaClinicMedical className="text-5xl"/>
                </div>
                <p className="font-bold">Clínica</p>
                <p>Lorem ipsum dolor sit amet consectetur</p>
              </button>
            </Link>
          </div>
        </Modal>
      </div>
    </nav>
  );
}
