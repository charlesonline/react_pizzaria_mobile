import api from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { LoginResponse, User } from "../types/index";

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

const AuthContext = createContext({} as AuthContextData);

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

      // console.log('📦 Loading storage data...');
      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
        setSigned(true);
        // console.log('✅ User loaded from storage');
      } else {
        // console.log('❌ No user in storage');
      }
    } catch (error) {
      console.error("Error loading storage data:", error);
    } finally {
      setLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      // console.log('🔐 Attempting login...');
      const response = await api.post<LoginResponse>("/session", {
        email,
        password,
      });

      // console.log('✅ Login successful');
      const { token, ...userData } = response.data;

      await AsyncStorage.setItem("@token:charlesonline", token);
      await AsyncStorage.setItem("@user:charlesonline", JSON.stringify(userData));

      setUser(userData);
      setSigned(true);
      // console.log('✅ User state updated');

    } catch (error:any) {
      // console.error("❌ Sign-in error:", error.message);
      if(error.response?.data?.error){
        // console.error("Server error:", error.response.data.error);
        throw new Error(error.response.data.error);
      }
      throw error;
    }
  }

  async function signOut() {
    // console.log('🚪 Logging out...');
    await AsyncStorage.removeItem("@token:charlesonline");
    await AsyncStorage.removeItem("@user:charlesonline");
    setUser(null);
    setSigned(false);
    // console.log('✅ Logout complete');
  }

  return (
    <AuthContext.Provider value={{ signed, loading, signIn, user , signOut}}>
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