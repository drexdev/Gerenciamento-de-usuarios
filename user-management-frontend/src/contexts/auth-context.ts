import { createContext, useContext } from "react";

export interface AuthData {
  id: string;
  token: string;
  email: string;
  firstName: string;
  lastName: string;
}

type Authenticated = {
  user: AuthData;
  logout: () => void;
};

type NotAuthenticated = {
  user: undefined;
  login: (email: string, password: string) => Promise<AuthData | Error>;
};

type AuthContextType = Authenticated | NotAuthenticated;

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const useAuth = <authenticated = false>(): authenticated extends true
  ? Authenticated
  : NotAuthenticated => {
  const context = useContext(AuthContext);

  return context as authenticated extends true
    ? Authenticated
    : NotAuthenticated;
};
