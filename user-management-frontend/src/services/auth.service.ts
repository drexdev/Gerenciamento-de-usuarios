import { AuthData } from "../contexts/auth-context";
import { api } from "../utils/api";

interface AuthResponse {
  "access-token": string;
}

/**
 * Função responsável por realizar o login do usuário.
 * @param {string} email - O email do usuário.
 * @param {string} password - A senha do usuário.
 * @returns {Promise<string>} - Uma Promise com o token do usuário.
 */
async function signIn(email: string, password: string): Promise<string> {
  const response = await api
    .post<AuthResponse>("/auth/login", {
      email,
      password,
    })
    .catch((error) => {
      console.error(error);

      if (error.response.status == 401) {
        // Caso haja um erro de autenticação, mostre uma mensagem de erro.
        throw new Error("E-mail ou senha estão inválidos.");
      } else {
        // Caso haja um erro genérico, mostre uma mensagem de erro.
        throw new Error(error.response.data.message);
        // throw new Error("Ocorreu um erro ao tentar realizar o login.");
      }
    });

  const { "access-token": accessToken } = response.data;
  return accessToken; // Caso seja retornado um token, retorne-o.
}

/**
 * Função responsável por remover os dados de autenticação do usuário.
 */
function signOut() {
  delete api.defaults.headers.common["Authorization"];

  localStorage.removeItem("@AuthData");
}

/**
 * Função responsável por salvar os dados de autenticação do usuário.
 * @param {AuthResponse} authData - Os dados de autenticação do usuário.
 */
function saveAuthData({ "access-token": accessToken }: AuthResponse) {
  api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  localStorage.setItem(
    "@AuthData",
    JSON.stringify({ "access-token": accessToken })
  );
}

/**
 * Faz uma requisição para buscar os dados do usuário.
 * @returns {Promise<AuthData>} Retorna os dados do usuário
 */
async function fetchDataUser() {
  const { data: userData } = await api
    .get<AuthData>("/users/@me")
    .catch((error) => {
      console.error(error);
      throw new Error("Ocorreu um erro ao buscar os dados do usuário.");
    });

  return userData;
}

export const authService = {
  signIn,
  signOut,
  saveAuthData,
  fetchDataUser,
};
