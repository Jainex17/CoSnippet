"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface UserType {
    id: string;
    email: string;
    name: string;
    picture: string;
}

interface AppContextType {
    user: UserType;
}

export let AppContext = createContext<AppContextType | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  
  const [user, setUser] = useState<UserType>({
    id: "",
    email: "",
    name: "",
    picture: "",
  });

  const AuthValue: AppContextType = {
    user,
  }
  
    return (
      <AppContext.Provider value={AuthValue}>
        {children}
      </AppContext.Provider>
    );
  };
  
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
      throw new Error('useAppContext must be used within a ContextProvider');
    }
    return context;
};