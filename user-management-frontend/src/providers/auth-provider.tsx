import React, { useState, ReactNode, useEffect } from "react";
import { AuthContext, AuthData } from "../contexts/auth-context";

import { authService } from "../services/auth.service";
import { toast } from "react-toastify";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthData | undefined>();

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("@AuthData") || "{}");

    if (authData["access-token"]) {
      authService.saveAuthData(authData); // Salva os dados de autenticação, na api e no localStorage.
      authService.fetchDataUser().then((userData) => setUser(userData)); // Busca os dados do usuário do token.
    }
  }, [setUser]);

  /**
   * Autentica um usuário com o email e senha fornecidos.
   *
   * @param {string} email - O email do usuário.
   * @param {string} password - A senha do usuário.
   * @return {Promise<void>} - Uma Promise que é resolvida quando o usuário é autenticado com sucesso.
   */
  function login(email: string, password: string) {
    authService
      .signIn(email, password)
      .then(async (accessToken) => {
        authService.saveAuthData({ "access-token": accessToken });

        const userData = await authService.fetchDataUser();
        setUser(userData);
      })
      .catch((error: Error) => {
        toast.error(error.message);
      });
  }

  function logout() {
    setUser(undefined);
    authService.signOut(); // Desloga o usuário.
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
