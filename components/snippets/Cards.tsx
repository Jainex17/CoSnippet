"use client";

import { useEffect, useState } from "react";
import { Card } from "./Card";
import { LoadingSnippet } from "./LoadingSnippet";

interface FileType {
  filename: string;
  language: string;
  code: string;
}

interface LikesTypes {
  sid: number;
  uid: number;
  reaction: string;
}

export interface SnippetType {
 sid: number;
  title: string;
  files: FileType[];
  user: {
    username: string;
    picture: string;
  };
  likes: LikesTypes[];
  createdAt: string;
  totalLikes: number;
}

export const Cards = () => {

  const [snippets, setSnippets] = useState<SnippetType[]>();

  async function getSnippets() {
    const res = await fetch("/api/snippet/getsnippets");
    const data = await res.json();
    setSnippets(data);  
  }

  useEffect(() => {
    getSnippets();
  }, []);

  return (
    <>
      <div className="my-10 max-w-3xl mx-10 md:mx-auto">
      
      {
        !snippets ? <LoadingSnippet /> : snippets.length > 0 && snippets.map((snip, index) => (
          <Card key={index} snippets={snip} />
        ))
      }
      </div>
    </>
  );
};
