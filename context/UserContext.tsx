'use client'

// context/UserContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the shape of the user object
interface User {
  id: string;
  email: string;
  name: string;
}

// Define the context type, which will store the user data and the setter function
interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Create the context with a default value (null for user and a function for setUser)
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Fetch session data from your API
    const fetchSessionData = async () => {
      const response = await fetch('/api/auth/sessiom');
      const data = await response.json();
      if (data.id) {
        setUser(data); // Assuming the API returns the user data in the expected format
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
