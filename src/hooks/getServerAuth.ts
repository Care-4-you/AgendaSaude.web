import { cookies } from "next/headers";

export function getServerAuth() {
  const cookieStore = cookies();
  const token = cookieStore.get("@Saude:token")?.value;
  const user = cookieStore.get("@Saude:user")?.value;

  return {
    token: token || "",
    user: user ? JSON.parse(user) : null
  };
}
