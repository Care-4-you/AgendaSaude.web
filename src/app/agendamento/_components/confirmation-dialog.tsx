"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from "@/components/ui/dialog";
import { SuccessCheck } from "@/components/ui/success-check";
import { formatDateLong, fromISODate } from "@/lib/date";
import { formatCurrency } from "@/lib/format";
import { IDoctorSlot, ISchedulingClinic } from "@/shared/interfaces/ISchedule";
import { Loader2 } from "lucide-react";

import {
  buildConfirmPayload,
  useConfirmAppointment
} from "../_hook/useConfirmAppointment";

interface ConfirmationDialogProps {
  open: boolean;
  clinic: ISchedulingClinic | null;
  slot: IDoctorSlot;
  /** yyyy-MM-dd */
  date: string;
  /** Desistiu da confirmação: volta para o resumo. */
  onCancel: () => void;
  /** Consulta confirmada e pop-up fechado. */
  onFinish: () => void;
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-poppins text-[10px] uppercase tracking-wider text-slate-400">
        {label}
      </span>
      <span className="font-poppins text-sm font-bold text-agenda-saude-purple-200">
        {value}
      </span>
    </div>
  );
}

/** Pequeno resumo da consulta, repetido nos dois estados do pop-up. */
function ConsultationDetails({
  slot,
  date
}: {
  slot: IDoctorSlot;
  date: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 rounded-xl border border-slate-200 p-4 sm:flex sm:justify-between sm:gap-6">
      <DetailItem label="Data" value={formatDateLong(fromISODate(date))} />
      <DetailItem label="Horário" value={slot.time} />
      <DetailItem
        label="Valor"
        value={formatCurrency(slot.price, { cents: false })}
      />
      <DetailItem label="Especialidade" value={slot.specialty} />
    </div>
  );
}

export function ConfirmationDialog({
  open,
  clinic,
  slot,
  date,
  onCancel,
  onFinish
}: ConfirmationDialogProps) {
  const {
    confirm,
    confirmation,
    isConfirming,
    isConfirmed,
    confirmError,
    resetConfirmation
  } = useConfirmAppointment();

  const handleConfirm = () => {
    confirm(buildConfirmPayload({ clinic, slot, date }));
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) return;

    if (isConfirmed) {
      onFinish();
      return;
    }

    resetConfirmation();
    onCancel();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl gap-6 rounded-2xl p-8">
        {isConfirmed ? (
          <div className="flex flex-col items-center gap-4 text-center">
            <SuccessCheck />

            <DialogTitle className="font-museo text-2xl font-bold text-agenda-saude-purple-200">
              Agendamento confirmado!
            </DialogTitle>

            <DialogDescription className="font-poppins text-sm text-slate-500">
              Tudo certo. Enviamos os detalhes para o seu e-mail e você pode
              acompanhar em{" "}
              <strong className="font-semibold text-agenda-saude-purple-200">
                Minhas consultas
              </strong>
              .
            </DialogDescription>

            <div className="w-full text-left">
              <ConsultationDetails slot={slot} date={date} />
            </div>

            {confirmation && (
              <span className="font-poppins text-xs text-slate-400">
                Protocolo {confirmation.protocol}
              </span>
            )}

            <button
              type="button"
              onClick={onFinish}
              className="mt-2 w-full rounded-lg bg-agenda-saude-purple-100 px-8 py-2.5 font-poppins text-sm font-semibold text-white transition-colors hover:bg-agenda-saude-purple-200 sm:w-auto"
            >
              Voltar ao início
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 text-center">
              <DialogTitle className="font-museo text-2xl font-bold text-agenda-saude-purple-200">
                Dados da consulta
              </DialogTitle>

              <DialogDescription className="font-poppins text-sm text-slate-500">
                Ao confirmar, enviaremos todas as informações da consulta para o
                seu e-mail e você poderá acompanhar em{" "}
                <strong className="font-semibold text-agenda-saude-purple-200">
                  Minhas consultas
                </strong>
                .
              </DialogDescription>
            </div>

            <ConsultationDetails slot={slot} date={date} />

            {confirmError && (
              <p
                role="alert"
                className="text-center font-poppins text-sm text-red-600"
              >
                Não foi possível confirmar agora. Tente novamente.
              </p>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                disabled={isConfirming}
                onClick={onCancel}
                className="rounded-lg border border-slate-300 px-10 py-2.5 font-poppins text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancelar
              </button>

              <button
                type="button"
                disabled={isConfirming}
                onClick={handleConfirm}
                className="flex items-center justify-center gap-2 rounded-lg bg-agenda-saude-purple-100 px-10 py-2.5 font-poppins text-sm font-semibold text-white shadow-md transition-colors hover:bg-agenda-saude-purple-200 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
              >
                {isConfirming && (
                  <Loader2
                    className="h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                {isConfirming ? "Confirmando..." : "Confirmar consulta"}
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
