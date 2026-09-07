import React from "react";

import pacientImage from "@/assets/pacient.png";

export default function Page() {
  const img = pacientImage.src;

  return (
    <div className="flex w-full  flex-col items-start justify-start  bg-agenda-saude-blue-100 ">
      <main className=" min-h-screen w-full overflow-hidden bg-[#efffff] text-[#182477]">
        {img && (
          <div
            aria-hidden="true"
            className="absolute  inset-y-0 right-0  w-[58%] bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${img})` }}
          />
        )}

        <div
          aria-hidden="true"
          className="absolute inset-0 w-full bg-[linear-gradient(90deg,#efffff_0%,#efffff_42%,rgba(239,255,255,0.96)_50%,rgba(239,255,255,0.18)_84%,rgba(239,255,255,0)_100%)]"
        />

        <section className="relative z-10 flex min-h-screen items-center  px-[21%] py-20 lg:px-[21%]">
          <div className=" max-w-xl">
            <h1 className="font-museo  text-4xl font-bold leading-[1.16] tracking-[-0.03em] text-[#182477]">
              Bem-vindo(a) ao
              <br />
              Agenda Saúde
            </h1>
            <p className="mt-3 font-poppins  text-lg leading-[1.5] text-[#40517f]">
              Escolha uma funcionalidade para facilitar seu dia.{" "}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
