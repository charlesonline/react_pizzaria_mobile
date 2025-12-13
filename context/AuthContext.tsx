import api from "@/services/api";
import { createContext, useContext,useState, useEffect } from "react";
import {LoginResponse, User} from "../types/index";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextData {
  user: User | null;
  signed: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [signed, setSigned] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function loadData() {
      await loadStorageData();
    }

    loadData();
  }, []);

  async function loadStorageData() {
    try {
      setLoading(true);
      const storagedUser = await AsyncStorage.getItem("@user:charlesonline");
      const storagedToken = await AsyncStorage.getItem("@token:charlesonline");

      if (storagedUser && storagedToken) {
        // api.defaults.headers.common["Authorization"] = `Bearer ${storagedToken}`;
        setUser(JSON.parse(storagedUser));
        // setSigned(true);
      }
    } catch (error) {
      console.error("Error loading storage data:", error);
    } finally {
      setLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const response = await api.post<LoginResponse>("/session", {
        email,
        password,
      });

      const { token, ...userData } = response.data;

      await AsyncStorage.setItem("@token:charlesonline", token);
      await AsyncStorage.setItem("@user:charlesonline", JSON.stringify(userData));

      setUser(userData);

    } catch (error:any) {
      if(error.response?.data?.error){
        console.error("Sign-in error:", error.response.data.error);
        return;
      }

      console.error("Error during sign-in:", error);
    }
  }

  async function signOut() {
    await AsyncStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, loading, signIn, user , signOut}}>
      {children}
    </AuthContext.Provider>
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