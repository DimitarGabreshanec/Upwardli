import React from "react";
import { getCoreAPIClient } from "@upwardli/shared/api";

interface AuthProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuthenticated: (auth: boolean) => void;
}

const AuthContext = React.createContext<AuthProps>({
  isAuthenticated: false,
  isLoading: true,
  setAuthenticated: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setAuthenticated] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const initializeAuth = async () => {
      const client = getCoreAPIClient();
      client
        .retrieveCustomUserDetails({})
        .then((resp: any) => {
          setAuthenticated(true);
          setLoading(false);
        })
        .catch((e: any) => {
          setLoading(false);
          if (e.status === 401) {
            setAuthenticated(false);
          }
        });
    };
    initializeAuth();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        setAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function useIsAuthenticated() {
  const context = useAuth();
  return context.isAuthenticated;
}
