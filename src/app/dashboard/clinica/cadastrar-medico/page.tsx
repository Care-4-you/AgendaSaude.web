"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";

// eslint-disable-next-line import-helpers/order-imports
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import { setCookie } from "nookies";

import { UFs } from "../../../../shared/utils";

import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { SearchDoctorProps } from "../../../../shared/interfaces/IClinica";

const animatedComponents = makeAnimated();

export default function Page() {
  const route = useRouter();
  const [crmTrue, setCrmTrue] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors }
  } = useForm<SearchDoctorProps>();

  const colorStyles = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: (styles: any) => ({
      ...styles,
      minHeight: "2.75em",
      maxWidth: "100%"
    })
  };

  const DoctorFinded = {
    name: "joao silva",
    UF: "RJ",
    councilsNumber: "123456"
  };
  const onSubmit: SubmitHandler<SearchDoctorProps> = async (data) => {
    setCookie({}, "@Saude:CreateDoctorAccountData", JSON.stringify(data), {
      path: "/"
    });

    if (
      DoctorFinded.UF === watch("state.value") &&
      DoctorFinded.councilsNumber === watch("councilsNumber")
    ) {
      setCrmTrue(true);
      setTimeout(() => {
        setOpenModal(true);
      }, 1000);
      return;
    }
    setCrmTrue(false);
    setTimeout(() => {
      setOpenModal(true);
    }, 1000);
  };

  const createDoctorAccount = () => {
    route.push("/register-doctor");
  };
  return (
    <>
      <div className="flex  w-full flex-1 flex-col  items-center  lg:items-start ">
        <h2 className="mb-6 font-museo text-3xl font-bold">Cadastrar Medico</h2>
        <form
          className="flex h-[600px] w-full max-w-[500px] flex-col  gap-20 rounded-3xl bg-agenda-saude-purple-300 p-12"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Label className="text-center text-white">
            Produto sem fins lucrativos
          </Label>
          <fieldset className=" grid grid-cols-1 gap-2  ">
            <div className="col-span-1 flex flex-col gap-3">
              <Label className="text-white" htmlFor="state">
                Qual é o Estado do conselho do médico?*
              </Label>
              <Controller
                control={control}
                name="state"
                rules={{ required: true }}
                render={(renderProps) => {
                  return (
                    <Select
                      styles={colorStyles}
                      className={`${errors.state ? " rounded-md border-2  border-red-500  focus-visible:ring-red-500" : ""}`}
                      id="Especialidadesmedica"
                      closeMenuOnSelect={true}
                      components={animatedComponents}
                      placeholder="Selecionar"
                      options={UFs}
                      menuPlacement="auto"
                      isSearchable={true}
                      menuPortalTarget={document.body}
                      menuPosition="fixed"
                      {...register("state", {
                        required: {
                          value: true,
                          message: "Campo obrigatorio"
                        }
                      })}
                      {...renderProps.field}
                      onChange={(e) => {
                        renderProps.field.onChange(e);
                      }}
                    />
                  );
                }}
              />
              <p className="min-h-4 text-sm  font-semibold text-red-500">
                {errors.state ? errors.state.message : ""}
              </p>
            </div>
            <Input
              labelClassName="text-white  col-span-1"
              type="text"
              className="col-span-4 lg:col-span-2"
              placeholder="9999999"
              label="Qual é o nº do conselho ?*"
              {...register("councilsNumber", {
                required: {
                  value: true,
                  message: "Campo obrigatório"
                }
              })}
              error={errors.councilsNumber ? errors.councilsNumber.message : ""}
            />
          </fieldset>
          <Button
            variant={"secondary"}
            type="submit"
            className="inline-flex h-11 w-full max-w-64 self-center   justify-self-center  rounded-lg bg-white text-black hover:bg-white/90"
          >
            Buscar
          </Button>
        </form>
      </div>

      <Dialog
        open={openModal}
        defaultOpen={openModal}
        modal
        onOpenChange={() => setOpenModal((prev) => !prev)}
      >
        {crmTrue ? (
          <DialogContent className=" flex  w-full max-w-[750px] flex-col  items-center justify-around gap-4 bg-agenda-saude-blue-100  ">
            <DialogHeader className=" gap-5">
              <DialogTitle className="text-center font-museo  text-2xl font-semibold  text-[#181819]">
                O médico {DoctorFinded.name} já possui cadastro em nossa
                plataforma.
              </DialogTitle>
              <DialogDescription className="text-center font-museo  text-2xl font-semibold  text-[#181819]">
                Você deseja convidá-lo para fazer parte do quadro da clínica?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className=" flex flex-row items-center gap-4 sm:justify-center">
              <Button
                type="button"
                className="h-12 w-40 bg-agenda-saude-purple-100  text-xl text-white"
                onClick={() => {
                  alert("Adicionado com sucesso !");
                }}
              >
                Sim
              </Button>
              <Button
                type="button"
                className="h-12 w-40 bg-agenda-saude-purple-100 text-xl text-white"
                onClick={() => setOpenModal((prev) => !prev)}
              >
                Não
              </Button>
            </DialogFooter>
          </DialogContent>
        ) : (
          <DialogContent className=" flex  w-full max-w-[750px] flex-col items-center  justify-around gap-4 bg-agenda-saude-blue-100  ">
            <DialogHeader className=" gap-5">
              <DialogTitle className="text-center font-museo  text-2xl font-semibold  text-[#181819]">
                Esse médico não possui cadastro em nossa plataforma
              </DialogTitle>
              <DialogDescription className="text-center font-museo  text-2xl font-semibold  leading-6 text-[#181819]">
                Você deseja cadastrar o médico?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className=" flex flex-row items-center gap-4 sm:justify-center">
              <Button
                type="button"
                className="h-12 w-40 bg-agenda-saude-purple-100  text-xl text-white"
                onClick={createDoctorAccount}
              >
                Sim
              </Button>
              <Button
                type="button"
                className="h-12 w-40 bg-agenda-saude-purple-100 text-xl text-white"
                onClick={() => setOpenModal((prev) => !prev)}
              >
                Não
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
