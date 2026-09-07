"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { SubmitHandler, useFieldArray, useWatch } from "react-hook-form";

import { RHFInput } from "@/components/RHFInput";
import { RHFSelect } from "@/components/RHFSelect";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/auth";
import { ChevronLeft } from "lucide-react";

import { councilsTypes, UFs } from "@/shared/utils";

import { useMyAccount } from "./_hook/useMyAccount";
import { MyAccountFormData } from "./_schema/my-account-schema";

const especializacoesPorConselho: Record<
  string,
  { value: string; label: string }[]
> = {
  CRM: [
    { value: "cardiologia", label: "Cardiologia" },
    { value: "ginecologia", label: "Ginecologia" },
    { value: "urologia", label: "Urologia" },
    { value: "ortopedia", label: "Ortopedia" },
    { value: "oncologia", label: "Oncologia" },
    { value: "geriatria", label: "Geriatria" },
    { value: "oftalmologia", label: "Oftalmologia" },
    { value: "angiologia", label: "Angiologia" },
    { value: "dermatologia", label: "Dermatologia" },
    { value: "cirurgia", label: "Cirurgia" },
    { value: "clinica-geral", label: "Clínica Geral" }
  ],
  CRN: [{ value: "nutricao", label: "Nutrição" }],
  CRO: [{ value: "odontologia", label: "Odontologia" }],
  CREFITO: [{ value: "fisioterapia", label: "Fisioterapia" }]
};

export default function Page() {
  const [openModal, setOpenModal] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const { myAccountForm } = useMyAccount({
    initialValues: {
      name: user?.name,
      cellphone: user?.cellphone,
      phone: user?.phone,
      medicalRecord: user?.medicalRecord || [],
      specialty: user?.specialty || []
    }
  });
  const { handleSubmit, control } = myAccountForm;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "medicalRecord"
  });

  const medicalRecordArray = useWatch({
    control,
    name: "medicalRecord"
  });

  // Combinar especialidades de todos os conselhos selecionados
  const especializacoes = useMemo(() => {
    const registrosComConselho = medicalRecordArray?.filter(
      (record) => record?.councils?.value
    );

    return (
      registrosComConselho
        ?.flatMap((record) => {
          const conselho = record.councils.value;

          return especializacoesPorConselho[conselho] ?? [];
        })
        .filter(
          (especializacao, index, array) =>
            index ===
            array.findIndex((item) => item.value === especializacao.value)
        ) ?? []
    );
  }, [medicalRecordArray]);

  const onSubmit: SubmitHandler<MyAccountFormData> = async (data) => {
    console.log(data);
    setOpenModal(true);
  };

  const backtoLogin = () => {
    setOpenModal((prev) => !prev);
    router.push("/dashboard");
  };

  return (
    <div className="w-full flex-1 flex-col items-start p-8 ">
      <div className="flex w-full flex-col items-start gap-8">
        <Link
          href="/dashboard/medico"
          className="mb-6 flex  items-center gap-2 text-start font-semibold text-black transition-all hover:underline"
        >
          <ChevronLeft size={24} strokeWidth={4} />
          <h2 className=" w-full text-start  font-museo text-2xl font-semibold">
            Dados cadastrais
          </h2>
        </Link>
        <div className="flex w-full items-center justify-center">
          <div className=" relative  w-full rounded-md  bg-agenda-saude-purple-300 ">
            <div className="absolute -top-10 left-1/2 flex h-20 w-80 -translate-x-1/2 transform items-center justify-center rounded-md bg-agenda-saude-green-100">
              <p className="text-2xl font-bold text-white">Dados cadastrais</p>
            </div>
            <form
              className="flex w-full flex-col items-center gap-2 px-10  py-16"
              onSubmit={handleSubmit(onSubmit)}
            >
              <fieldset className="scroll-custom grid w-full grid-cols-2 items-center  gap-2 p-4 md:max-h-[600px] md:overflow-y-auto  ">
                <RHFInput<MyAccountFormData>
                  id="name"
                  type="text"
                  className="input-with-icon col-span-6 "
                  placeholder="Nome completo"
                  label="Nome completo*"
                  name="name"
                  control={myAccountForm.control}
                />

                <RHFInput<MyAccountFormData>
                  id="cellPhone"
                  mask="CELLPHONE"
                  type="tel"
                  className=" input-with-icon col-span-3"
                  placeholder="(00) 00000-0000"
                  label="Celular*"
                  name="cellphone"
                  control={myAccountForm.control}
                />

                <RHFInput<MyAccountFormData>
                  id="phone"
                  mask="PHONE"
                  type="tel"
                  className="input-with-icon col-span-3"
                  placeholder="(00) 0000-0000"
                  label="Telefone*"
                  name="phone"
                  control={myAccountForm.control}
                />

                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="col-span-6 grid w-full grid-cols-6 items-end justify-end gap-2"
                  >
                    <div className="col-span-3">
                      <RHFSelect<MyAccountFormData>
                        options={councilsTypes}
                        id="councils"
                        name={`medicalRecord.${index}.councils` as const}
                        className=""
                        placeholder="Conselho"
                        label="Conselho*"
                        control={myAccountForm.control}
                      />
                    </div>
                    <div
                      className={`${fields.length > 1 ? "col-span-2" : "col-span-3"} flex flex-col gap-3`}
                    >
                      <RHFSelect<MyAccountFormData>
                        options={UFs}
                        id="councilsUF"
                        name={`medicalRecord.${index}.councilsUF` as const}
                        className="col-span-6"
                        placeholder="UF"
                        label=" Estado do conselho*"
                        control={myAccountForm.control}
                      />
                    </div>

                    {fields.length > 1 && (
                      <Button
                        type="button"
                        size="icon"
                        variant={"destructive"}
                        onClick={() => remove(index)}
                        className=" col-span-1 min-h-[46px] w-full "
                      >
                        X
                      </Button>
                    )}

                    <RHFInput<MyAccountFormData>
                      className={` col-span-6  `}
                      placeholder="Número do Conselho"
                      label="Número do Conselho*"
                      id="councilsNumber"
                      type="text"
                      name={`medicalRecord.${index}.councilsNumber` as const}
                      control={myAccountForm.control}
                    />
                  </div>
                ))}

                {fields.length < 2 && (
                  <Button
                    type="button"
                    size="lg"
                    onClick={() =>
                      append({
                        councilsNumber: "",
                        councils: { value: "", label: "" },
                        councilsUF: { value: "", label: "" }
                      })
                    }
                    className="hover:bg-agenda-saude-green-200/90 min-h-10! col-span-6  my-2 w-full bg-agenda-saude-green-100"
                  >
                    + Adicionar conselhos
                  </Button>
                )}

                <div className=" col-span-6 flex flex-col gap-3 ">
                  <RHFSelect<MyAccountFormData>
                    isMulti
                    options={especializacoes}
                    id="specialty"
                    name="specialty"
                    className="col-span-6"
                    placeholder="Especialidade"
                    label="Especialidade*"
                    control={myAccountForm.control}
                  />
                </div>
              </fieldset>

              <Button
                type="submit"
                variant="default"
                size="lg"
                className=" hover:bg-agenda-saude-green-200/90 bg-agenda-saude-green-100 font-poppins text-lg font-semibold text-agenda-saude-blue-100"
              >
                Salvar
              </Button>
            </form>
          </div>
        </div>
      </div>
      <Dialog
        open={openModal}
        defaultOpen={openModal}
        modal
        onOpenChange={() => setOpenModal((prev) => !prev)}
      >
        <DialogContent className=" max-w-60 items-center rounded-md bg-agenda-saude-blue-100 sm:max-w-2xl">
          <DialogHeader className="gap-5">
            <DialogTitle className=" self-center text-center text-2xl  font-semibold text-black">
              Você tem certeza que deseja alterar o dados de cadastro para o
              novo informado?
            </DialogTitle>
          </DialogHeader>
          <DialogFooter className=" flex w-full items-center sm:justify-around">
            <Button
              type="submit"
              variant="default"
              size="lg"
              className=" hover:bg-agenda-saude-green-200/90 bg-agenda-saude-purple-100 font-poppins text-lg font-semibold text-agenda-saude-blue-100"
              onClick={backtoLogin}
            >
              Sim
            </Button>
            <Button
              type="submit"
              variant="default"
              size="lg"
              className=" hover:bg-agenda-saude-green-200/90 bg-agenda-saude-purple-100 font-poppins text-lg font-semibold text-agenda-saude-blue-100"
              onClick={() => setOpenModal((prev) => !prev)}
            >
              Não
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
