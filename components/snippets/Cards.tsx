"use client";

import { useEffect, useState } from "react";
import { Card } from "./Card";
import { LoadingSnippet } from "./LoadingSnippet";
import { Snippet } from "@/utils/types";
export const Cards = () => {

  const [snippets, setSnippets] = useState<Snippet[]>();

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
