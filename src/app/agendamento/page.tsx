import db from "@/Api/db.json";
import { ISchedulingClinic } from "@/shared/interfaces/ISchedule";

import { SchedulingFlow } from "./_components/scheduling-flow";

interface AgendamentoPageProps {
  searchParams: {
    clinicId?: string;
    especialidade?: string;
  };
}

/** A clínica chega do mapa pelo id; sem id a barra lateral fica sem o cartão. */
function findClinic(clinicId?: string): ISchedulingClinic | null {
  if (!clinicId) return null;

  const clinica = db.clinicas.find((item) => String(item.id) === clinicId);

  if (!clinica) return null;

  return {
    id: clinica.id,
    name: clinica.nome,
    specialties: clinica.especialidades,
    title: clinica.titulo,
    address: clinica.endereco.rua,
    houseNumber: clinica.endereco.numero,
    neighborhood: clinica.endereco.bairro,
    city: clinica.endereco.cidade,
    state: clinica.endereco.uf
  };
}

/**
 * O filtro do agendamento só aceita especialidades que a clínica atende —
 * assim uma URL com valor solto não deixa a tela sem horário nenhum.
 */
function resolveSpecialty(
  clinic: ISchedulingClinic | null,
  especialidade?: string
) {
  if (!clinic) return especialidade ?? "";

  const matched = especialidade
    ? clinic.specialties.find(
        (item) => item.toLowerCase() === especialidade.toLowerCase()
      )
    : undefined;

  if (matched) return matched;

  // Clínica de especialidade única não tem escolha a fazer.
  return clinic.specialties.length === 1 ? clinic.specialties[0] : "";
}

export default function AgendamentoPage({
  searchParams
}: AgendamentoPageProps) {
  const clinic = findClinic(searchParams.clinicId);

  return (
    <main className="w-full pt-24 md:pt-20">
      <SchedulingFlow
        clinic={clinic}
        specialty={resolveSpecialty(clinic, searchParams.especialidade)}
      />
    </main>
  );
}
