import { createContext, useContext } from "react";

interface AuthProvaiderProps {
  children: React.ReactNode;
}

interface AuthContextData {
  signed: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProvaiderProps) {
    const signed = false;
    const loading = false;

  async function signIn(email: string, password: string) {
    // Implement your sign-in logic here
  }

  return (
    <AuthContext value={{ signed, loading, signIn }}>
      {children}
    </AuthContext>
  );
}

// Custom hook for easier context consumption
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}