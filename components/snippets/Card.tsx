"use client";

import { Divider, snippet } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Prism from "prismjs";
import { loadPrismLanguage } from "@/utils/LoadPrismLanguage";
import { useAppContext } from "@/utils/AppContext";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";
import { Snippet } from "@/utils/types";

export const Card = ({ snippets }: { snippets: Snippet }) => {
  const { user } = useAppContext();

  useEffect(() => {
    if (snippets.files.length === 0) return;

    loadPrismLanguage(snippets.files[0].language);

    if (typeof Prism !== "undefined") {
      Prism.highlightAll();
    }
  }, [snippets.files]);

  useEffect(() => {
    snippets.likes.forEach((like) => {
      if (like.uid === user.uid) {
        if (like.reaction === "LIKE") {
          setIsLiked(true);
        } else {
          setIsDisLiked(true);
        }
      }
    });
  }, [snippets.likes, user.uid]);

  const [likes, setLikes] = useState(snippets.totalLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisLiked, setIsDisLiked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleLike = async () => {
    if (user.uid === -1) {
      toast.error("Please Login");
      return;
    }

    if (isProcessing) return;
    setIsProcessing(true);

    // Optimistic update
    const newLikes = isLiked ? likes - 1 : isDisLiked ? likes + 2 : likes + 1;
    setLikes(newLikes);
    setIsLiked(!isLiked);
    setIsDisLiked(false);

    const res = await fetch("/api/snippet/reactSnippet", {
      method: "POST",
      body: JSON.stringify({
        uid: user.uid,
        sid: snippets.sid,
        islike: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status !== 200) {
      setLikes(likes);
      setIsLiked(!isLiked);
      toast.error("Failed to update like");
    }

    setTimeout(() => setIsProcessing(false), 300);
  };

  const handleDisLike = async () => {
    if (user.uid === -1) {
      toast.error("Please Login");
      return;
    }

    if (isProcessing) return;
    setIsProcessing(true);

    const res = await fetch("/api/snippet/reactSnippet", {
      method: "POST",
      body: JSON.stringify({
        uid: user.uid,
        sid: snippets.sid,
        islike: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      if (isDisLiked) {
        setLikes(likes + 1);
      } else {
        if (isLiked) {
          setLikes(likes - 2);
        } else {
          setLikes(likes - 1);
        }
      }
      setIsDisLiked(!isDisLiked);
      setIsLiked(false);
    }
    setTimeout(() => setIsProcessing(false), 900);
  };

  const backgroundColor = isLiked
    ? "bg-red-800"
    : isDisLiked
    ? "bg-blue-800"
    : "bg-[#201421]";
  
  return (
    <>
      {snippets.files.length > 0 && (
        <div className="my-5">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex gap-3 md:gap-5 mt-3 items-center">
                <Image
                  src={snippets.user.picture || ""}
                  width={100}
                  height={100}
                  className="w-8 h-8 md:w-10 md:h-10 hidden sm:block rounded-full"
                  alt="User Image"
                />
                <div className="flex flex-col gap-1 items-start justify-center">
                  <h4 className="text-sm md:text-lg font-semibold leading-none text-default-600 flex items-center gap-1">
                    <Link
                      href={"/" + snippets.user.username}
                      className="text-blue-500 hover:underline"
                    >
                      {snippets.user.username}
                    </Link>
                    /
                    <Link
                      href={"/" + snippets.user.username + "/" + snippets.sid}
                      className="text-blue-500 hover:underline overflow-hidden truncate w-36 sm:w-72 md:w-[30rem]"
                    >
                      {snippets.title}
                    </Link>
                  </h4>
                  <h5 className="text-[0.6rem] md:text-xs tracking-tight text-default-400">
                    Created on{" "}
                    {new Date(snippets.createdAt).toLocaleDateString()}
                  </h5>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-gray-800 rounded-lg py-1 px-4 my-4 text-xs">
            <pre className={`language-${snippets.files[0].language}`}>
              <code>{snippets.files[0].code}</code>
            </pre>
          </div>

          <div className="flex gap-3">
            <div
              className={`${backgroundColor} rounded-full flex items-center gap-1 `}
            >
              <button
                className="hover:bg-[#333D42] hover:text-red-600 p-2 rounded-full"
                onClick={handleLike}
              >
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
              <span className="text-sm select-none">{likes}</span>
              <button
                className="hover:bg-[#333D42] hover:text-blue-600 p-2 rounded-full"
                onClick={handleDisLike}
              >
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

            {/* <div className="bg-[#201421] rounded-full gap-1">
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
          </div> */}
          </div>
        </div>
      )}
      <Divider />
    </>
  );
};
