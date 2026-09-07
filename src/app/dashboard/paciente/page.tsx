
import React from "react";
import pacientImage from "@/assets/pacient.png";

export default function Page() {

  const img = pacientImage.src;

  return (
    <div className="flex w-full  flex-col items-start justify-start  bg-agenda-saude-blue-100 ">
     <main className=" min-h-screen overflow-hidden w-full bg-[#efffff] text-[#182477]">
      { img  &&  (
        <div
          aria-hidden="true"
          className="absolute  inset-y-0 right-0  bg-cover bg-center bg-no-repeat w-[58%]"
          style={{ backgroundImage: `url(${img})` }}
        />
      )}

      <div
        aria-hidden="true"
        className="absolute w-full inset-0 bg-[linear-gradient(90deg,#efffff_0%,#efffff_42%,rgba(239,255,255,0.96)_50%,rgba(239,255,255,0.18)_84%,rgba(239,255,255,0)_100%)]"
      />

      <section className="relative z-10 flex min-h-screen items-center  px-[21%] py-20 lg:px-[21%]">
        <div className=" max-w-xl">
          <h1 className="font-museo  font-bold leading-[1.16] tracking-[-0.03em] text-[#182477] text-4xl">
            Bem-vindo(a) ao
            <br />
            Agenda Saúde
          </h1>
          <p className="mt-3 font-poppins  leading-[1.5] text-[#40517f] text-lg">
  Escolha uma funcionalidade para facilitar seu dia.          </p>
        </div>
      </section>

    </main>
    </div>
  );
}
