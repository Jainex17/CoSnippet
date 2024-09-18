"use client";

import { Avatar, Divider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Prism from "prismjs";
import { loadPrismLanguage } from "@/utils/LoadPrismLanguage";

interface CardProps {
  snippet: {
    language: string;
    code: string;
  };
}

export const Card = ({ snippet }: CardProps) => {
  useEffect(() => {
    loadPrismLanguage(snippet.language);

    if (typeof window !== "undefined") {
      Prism.highlightAll();
    }
  }, []);

  return (
    <>
      <div className="my-5">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl md:text-2xl font-semibold">
              Title of the card - card component
            </h3>

            <div className="flex gap-3 md:gap-5 mt-3">
              <Avatar
                isBordered
                radius="full"
                className="w-8 h-8 md:w-10 md:h-10"
                src="https://nextui.org/avatars/avatar-4.png"
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-xs md:text-small font-semibold leading-none text-default-600">
                  Zoey Lang
                </h4>
                <h5 className="text-[0.6rem] md:text-xs tracking-tight text-default-400">
                  23/3/2023
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-gray-800 rounded-lg py-1 px-4 my-4 text-xs">
          <pre className={`language-${snippet.language}`}>
            <code>{snippet.code}</code>
          </pre>
        </div>

        <div className="flex gap-3">
          <div className="bg-[#201421] rounded-full flex items-center gap-1">
            <button className="hover:bg-[#333D42] hover:text-red-600 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625zM15 12h-1v8h-4v-8H6.081L12 4.601L17.919 12z"
                ></path>
              </svg>
            </button>
            <span className="text-sm">20</span>
            <button className="hover:bg-[#333D42] hover:text-blue-600 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M20.901 10.566A1 1 0 0 0 20 10h-4V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H4a1.001 1.001 0 0 0-.781 1.625l8 10a1 1 0 0 0 1.562 0l8-10c.24-.301.286-.712.12-1.059M12 19.399L6.081 12H10V4h4v8h3.919z"
                ></path>
              </svg>
            </button>
          </div>

          <div className="bg-[#201421] rounded-full gap-1">
            <button className="p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M5 21V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v16l-7-3zm2-3.05l5-2.15l5 2.15V5H7zM7 5h10z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <Divider />
    </>
  );
};
