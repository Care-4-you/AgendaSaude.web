import { redirect } from "next/navigation";

import { getServerAuth } from "../../hooks/getServerAuth";

export default function page() {
  const { token, user } = getServerAuth();
  if (token) {
    if (user.role === "USER") {
      redirect("/dashboard/medico");
    } else if (user.role === "paciente") {
      redirect("/dashboard/paciente");
    } else if (user.role === "USER") {
      redirect("/dashboard/clinica");
    }
  }
  return redirect("/");
}
