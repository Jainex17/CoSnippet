"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface UserType {
    id: number;
    email: string;
    name: string;
    picture: string;
}

interface SnippetType {
    title: string;
    files: FilesTypes[];
    uid: number;
}

interface FilesTypes {
    id: number;
    filename: string;
    code: string;
}

interface AppContextType {
    user: UserType;
    snippet: SnippetType;
    setSnippet: (snippet: SnippetType) => void;
    files: FilesTypes[];
    setFiles: (files: FilesTypes[]) => void;
}

export let AppContext = createContext<AppContextType | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  
  const [user, setUser] = useState<UserType>({
    id: -1,
    email: "",
    name: "",
    picture: "",
  });

  const [files, setFiles] = useState<FilesTypes[]>([
    { id: Date.now() , filename: "", code: "" },
  ]);

  const [snippet, setSnippet] = useState<SnippetType>(
    { title: "", files: files, uid: user.id } 
  );

  const AuthValue: AppContextType = {
    user,
    snippet,
    setSnippet,
    files,
    setFiles,
  }
  
    return (
      <AppContext.Provider value={AuthValue}>
        {children}
      </AppContext.Provider>
    );
  };
  
export const useAppContext = () => {
    const appContext = useContext(AppContext);
    if (!appContext) {
      throw new Error('useAppContext must be used within a ContextProvider');
    }
    return appContext;
};