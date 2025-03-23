"use client";

import { useEffect, useState } from "react";
import { Card } from "./Card";
import { LoadingSnippet } from "./LoadingSnippet";
import { Snippet } from "@/utils/types";

export const Cards = () => {
  const [snippets, setSnippets] = useState<Snippet[]>();
  const [isLoading, setIsLoading] = useState(true);

  async function getSnippets() {
    setIsLoading(true);
    try {
      // Add timestamp to prevent caching
      const timestamp = new Date().getTime();
      const res = await fetch(`/api/snippet/getsnippets?t=${timestamp}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      const data = await res.json();
      setSnippets(data);
    } catch (error) {
      console.error("Failed to fetch snippets:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getSnippets();
  }, []);

  return (
    <>
      <div className="my-10 max-w-3xl mx-10 md:mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Snippets</h2>
          <button 
            onClick={getSnippets}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm flex items-center"
            disabled={isLoading}
          >
            {isLoading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
        
        {
          isLoading ? <LoadingSnippet /> : snippets && snippets.length > 0 ? snippets.map((snip, index) => (
            <Card key={index} snippets={snip} />
          )) : <p className="text-center text-gray-500">No snippets found</p>
        }
      </div>
    </>
  );
};
