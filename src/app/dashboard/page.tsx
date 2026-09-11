import { redirect } from "next/navigation";

import { getServerAuth } from "../../hooks/getServerAuth";

export default function page() {
  const { token, user } = getServerAuth();
  console.log(token, user);
  if (token) {
    if (user.role === "medico") {
      redirect("/dashboard/medico");
    } else if (user.role === "paciente") {
      redirect("/dashboard/paciente");
    } else if (user.role === "USER") {
      redirect("/dashboard/clinica");
    }
  }
  return redirect("/");
}
