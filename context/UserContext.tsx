'use client'

import { createContext, useContext, useState, ReactNode } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

interface Job {
  id: number;
  title: string;
  description: string;
  category: string;
  location: string;
  salary: number;
  status: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  appliedJobs: Job[];
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  refetchUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const { data, refetch }: UseQueryResult<User | null, Error> = useQuery({
    queryKey: ["session"],
    queryFn: async (): Promise<User | null> => {
      const response = await fetch("/api/auth/session");
      if (!response.ok) {
        throw new Error("Failed to fetch session");
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 5, 
  });

  if (data && user !== data) {
    setUser(data);
  }

  return (
    <UserContext.Provider value={{ user, setUser, refetchUser: refetch }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
