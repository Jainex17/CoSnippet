"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "react-toastify";
import { User } from "./types";

interface SnippetType {
    title: string;
}

interface FilesTypes {
    id: number;
    filename: string;
    code: string;
}

interface AppContextType {
    user: User
    setUser: (user: User) => void;
    snippet: SnippetType;
    setSnippet: (snippet: SnippetType) => void;
    files: FilesTypes[];
    setFiles: (files: FilesTypes[]) => void;
    handleCreateSnippet: () => void;
}

export let AppContext = createContext<AppContextType | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  
  const [user, setUser] = useState<User>({
    uid: -1,
    email: "",
    username: "",
    nickname: "",
    picture: "",
    createdAt: new Date(),
  });

  const [files, setFiles] = useState<FilesTypes[]>([
    { id: Date.now() , filename: "", code: "" },
  ]);

  const [snippet, setSnippet] = useState<SnippetType>(
    { title: "" } 
  );

  const handleCreateSnippet = async () => {
    if(snippet.title === "") {
      toast.error("Please enter a title for the snippet");
      return;
    }
    
    if(snippet.title.length > 90) {
      toast.error("Title should be less than 90 characters");
      return;
    }

    if(files.map(file => file.filename).includes("")) {
      toast.error("Please enter a filename for all files");
      return;
    }

    if(files.map(file => file.code).includes("")) {
      toast.error("Please enter code for all files");
      return;
    }

    // same file name check
    const filenames = files.map(file => file.filename);
    const duplicate = filenames.some((filename, index) => filenames.indexOf(filename) !== index);
    if(duplicate) {
      toast.error("Please enter unique filenames");
      return;
    }

    const toastId = toast.loading("Creating snippet...");

    const username = user.username;

    const res = await fetch("/api/snippet/createsnippet",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, snippet, snippetFiles:files }),
    });

    if(res) {
      toast.update(toastId, { render: "Snippet created successfully", type: "success", isLoading: false, autoClose: 2000});
      setFiles([{ id: Date.now(), filename: "", code: "" }]);
      setSnippet({ title: "" });
    }else{
      toast.update(toastId, { render: "Failed to create snippet", type: "error", isLoading: false, autoClose: 2000});
    }
  }

  const AuthValue: AppContextType = {
    user,
    setUser,
    snippet,
    setSnippet,
    files,
    setFiles,
    handleCreateSnippet,
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