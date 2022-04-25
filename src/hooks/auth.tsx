import React, { createContext, useContext, useState, ReactNode } from "react";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";

type AuthContextData = {
    signIn: (email: string, password: string) => Promise<void>;
    isLogging: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [isLogging, setIsLogging] = useState(false);

  async function signIn(email: string, password: string) {
    if (!email || !password) {
      return Alert.alert("Login", "Informe o e-mail e a senha");
    }

    setIsLogging(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(account => {
        console.log(account);
      })
      .catch((error) => {
        const { code } = error;

        /* switch (code) {
          case "auth/user-not-found" || "auth/wrong-password":
            Alert.alert("Login", "E-mail e/ou senha inválida.");
            break;

          default:
            Alert.alert("Login", "Não foi possível realizar o login.");
            break;
        } */
      })
      .finally(() => setIsLogging(false));
  }

  return <AuthContext.Provider value={{signIn, isLogging}}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
