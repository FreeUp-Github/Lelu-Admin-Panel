import React, { useEffect } from "react";
import { clearToken, getToken, setToken } from ".";

interface AuthContextType {
  hasToken: boolean;
  set(...args: Parameters<typeof setToken>): void;
  clearToken(): void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  let [hasToken, setHasToken] = React.useState(false);

  useEffect(() => {
    setHasToken(!!getToken());
  }, []);

  let value = {
    hasToken,
    set(...args: Parameters<typeof setToken>) {
      setToken(...args);
      setHasToken(!!getToken());
    },
    clearToken() {
      clearToken();
      setHasToken(!!getToken());
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return React.useContext(AuthContext);
}

export { AuthProvider, useAuth };
