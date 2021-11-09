import * as React from "react";

const AuthContext = React.createContext<boolean | undefined>(undefined);
const AuthUpdateContext = React.createContext<any>(undefined);

// Custom hook that returns the status of login
export function getAuthenticationState() {
  return React.useContext(AuthContext);
}

// Custom hook that returns an object containing all functions related to authentication
export function useAuthStateFunc() {
  return React.useContext(AuthUpdateContext);
}

type AuthContextProps = {
  children: React.ReactChild | React.ReactChild[];
};

export function AuthContextProvider({ children }: AuthContextProps) {
  const [authState, setAuthState] = React.useState(false);

  function upwardliLogin() {
    setAuthState(true);
  }

  function logout() {
    setAuthState(false);
  }

  // Encapsulates all children so the children have access to the state of authentication
  return (
    <AuthContext.Provider value={authState}>
      <AuthUpdateContext.Provider value={{ upwardliLogin, logout }}>
        {children}
      </AuthUpdateContext.Provider>
    </AuthContext.Provider>
  );
}
