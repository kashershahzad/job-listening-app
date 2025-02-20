'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the shape of the user object
interface Job {
  id: number;
  title: string;
  description: string;
  category: string;
  location: string;
  salary: number;
  status:string
}

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  appliedJobs: Job[];
}

// Define the context type
interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await fetch('/api/auth/session');
        const data = await response.json();
  
        if (data.id) {
          setUser(data);
        } else {
          console.warn("No user session found");
        }
      } catch (error) {
        console.error("Error fetching session data:", error);
      }
    };
  
    fetchSessionData();
  }, []);
  
 

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use the UserContext
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
