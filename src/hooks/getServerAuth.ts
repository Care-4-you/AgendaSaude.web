import { cookies } from "next/headers";

// Autenticação no servidor baseada nos cookies gravados pelo login.
// Funciona tanto com o fluxo real (API) quanto com o fluxo mockado,
// já que ambos gravam os mesmos cookies "@Saude:token" e "@Saude:user".
export function getServerAuth() {
  const cookieStore = cookies();
  const token = cookieStore.get("@Saude:token")?.value;
  const userCookie = cookieStore.get("@Saude:user")?.value;

  let user = null;

  try {
    user = userCookie ? JSON.parse(userCookie) : null;
  } catch {
    user = null;
  }

  return {
    token: token || "",
    user
  };
}
