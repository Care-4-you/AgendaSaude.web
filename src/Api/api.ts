/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from "axios";
import { destroyCookie, parseCookies } from "nookies";
const signOut = () => {
  destroyCookie({}, "@Saude:token", {
    path: "/"
  });
  destroyCookie({}, "@Saude:user", {
    path: "/"
  });
  window.location.href = "/signin";
  window.location.reload();
};

const baseURL = "https://api.preview.lowsales.com.br/";

function setupAPIClient(ctx: any = undefined) {
  const cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${cookies["@Saude:token"]}`
    }
  });

  api.interceptors.response.use(
    (response: any) => response,
    (error: AxiosError<any>) => {
      if (error.response?.status === 401) {
        if (
          error.response.data.errors &&
          error.response.data.errors[0].message.includes(
            "E_UNAUTHORIZED_ACCESS"
          )
        ) {
          signOut();
          if (process.browser) {
            signOut();
          } else {
            return Promise.reject("Error with authentication token");
          }
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
}

export const api = setupAPIClient();
