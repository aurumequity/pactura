"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebaseClient";
import { apiGet } from "@/lib/api";

interface Org {
  id: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  org: Org | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  org: null,
  loading: true,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [org, setOrg] = useState<Org | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        try {
          const orgs = await apiGet<Org[]>("/orgs");
          setOrg(orgs[0] ?? null); // Use first org for now
        } catch {
          setOrg(null);
        }
      } else {
        setOrg(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function logout() {
    await signOut(auth);
    setOrg(null);
    router.push("/sign-in");
  }

  return (
    <AuthContext.Provider value={{ user, loading, org, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
