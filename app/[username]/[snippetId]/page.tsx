"use client";

import { Chip, Divider, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import { loadPrismLanguage } from "@/utils/LoadPrismLanguage";
// require(`prismjs/components/prism-cilkc`);
import Prism from "prismjs";
import Image from "next/image";
import { useAppContext } from "@/utils/AppContext";
import { toast } from "react-toastify";
import { Snippet } from "@/utils/types";
import LoadingDetailsSnippet from "@/components/snippets/LoadingDetailsSnippet";
import PageNotFound from "@/components/PageNotFound";

const Page = () => {
  const { snippetId, username }: { snippetId: string; username: string } = useParams();
  const { user } = useAppContext();

  const [loading, setLoading] = React.useState(true);
  const [snippets, setSnippets] = React.useState<Snippet>();
  const [ownSnippet, setOwnSnippet] = React.useState(false);

  const getSnippets = useCallback(async () => {
    try {
      const intsnippetId = parseInt(snippetId);

      const res = await fetch("/api/snippet/getsnippetdetails", {
        method: "POST",
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        },
        body: JSON.stringify({ snippetId: intsnippetId, username }),
      });
      if (res.status === 200) {
        const data = await res.json();
        
        setSnippets(data);

        for (let i = 0; i < data.files.length; i++) {
          loadPrismLanguage(data.files[i].language);
        }
      }
    } catch (error) {
      console.error("Error loading snippet", error);
    } finally {
      setLoading(false);
    }
  }, [snippetId]);

  const highlightCode = useCallback(() => {
    if (typeof Prism !== "undefined") {
      Prism.highlightAll();
    }
  }, []);

  useEffect(() => {
    getSnippets();
  }, [getSnippets]);

  useEffect(() => {
    if (snippets) {
      highlightCode();
    }
  }, [snippets, highlightCode]);

  useEffect(() => {
    if (snippets) {
      if (user && snippets.user.id === user.uid) {
        setOwnSnippet(true);
      }
    }
  }, [snippets, user]);

  async function handleDelete() {
    if (snippets) {
      if (confirm("Are you sure you want to delete this snippet?")) {
        const toastId = toast.loading("Deleting snippet...");

        const res = await fetch("/api/snippet/deletesnippet", {
          method: "POST",
          body: JSON.stringify({ snippetId: snippets.sid, userId: user.uid }),
        });

        if (res.status === 200) {
          toast.update(toastId, {
            render: "Snippet deleted successfully",
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });
          window.location.href = `/${user.username}`;
        } else {
          toast.update(toastId, {
            render: "Failed to delete snippet",
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
        }
      }
    }
  }

  async function deleteFile(fid: number) {
    if (snippets && fid) {
      if (confirm("Are you sure you want to delete this file?")) {
        const toastId = toast.loading("Deleting file...");

        const res = await fetch("/api/snippet/deletefile", {
          method: "POST",
          body: JSON.stringify({ snippetId: snippets.sid, fid }),
        });

        if (res.status === 200) {
          toast.update(toastId, {
            render: "File deleted successfully",
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });
          getSnippets();
        } else {
          toast.update(toastId, {
            render: "Failed to delete file",
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
        }
      }
    }
  }
  
  return (
    <>
      {loading ? (
        <LoadingDetailsSnippet />
      ) : snippets == undefined ? <>
        <PageNotFound />
      </> : (
        <>
          <div className="flex items-center justify-between gap-3 mx-5 mt-10 mb-6 md:mx-20">
            <div className="flex items-center gap-3 md:gap-5">
              <Image
                alt="User Picture"
                src={snippets?.user.picture || ""}
                width={100}
                height={100}
                className="w-10 h-10 md:w-14 md:h-14 hidden sm:block rounded-full"
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-sm md:text-lg font-semibold leading-none text-default-600 flex items-center gap-1">
                  <Link
                    href={"/" + snippets?.user.username}
                    className="text-blue-500 hover:underline"
                  >
                    {snippets?.user.username}
                  </Link>
                  /
                  <Link
                    href={"/" + snippets?.user.username + "/" + snippets?.sid}
                    className="text-blue-500 hover:underline"
                  >
                    {snippets?.title}
                  </Link>

                  {
                    snippets?.public == false && (
                      <Chip
                        color="danger"
                        size="sm"
                        className="text-[0.6rem] md:text-xs ml-2"
                      >
                        Private
                  </Chip>
                  )}
                </h4>
                <h5 className="text-[0.6rem] md:text-xs tracking-tight text-default-400">
                  Created on{" "}
                  {snippets &&
                    new Date(snippets.createdAt).toLocaleDateString()}
                </h5>
              </div>
            </div>
            {ownSnippet && (
            <button
              className="text-red-600 font-bold rounded-lg py-2 px-3 bg-slate-800 flex items-center gap-2 hover:text-white hover:bg-red-700 transition duration-300"
              onClick={handleDelete}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
                ></path>
              </svg>
              <span className="text-sm">Delete</span>
            </button>
            )}
          </div>

          <Divider />

          {snippets?.files.map((file, index) => (
            <div className="my-8 max-w-4xl mx-auto" key={index}>
              <div className="h-12 bg-[#201421] rounded-t-lg flex items-center px-4 justify-between">
                <h6 className="text-sm flex items-center gap-2 text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="white"
                      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm4 18H6V4h7v5h5z"
                    ></path>
                  </svg>
                  {file.filename}
                </h6>

                <div className="flex gap-3">
                  <Tooltip
                    placement="top"
                    content="Copy file"
                    color="default"
                    size="sm"
                  >
                    <button
                      className="text-white rounded-lg py-2 px-3 bg-slate-800"
                      onClick={() => navigator.clipboard.writeText(file.code)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4"
                        viewBox="0 0 24 24"
                      >
                        <g fill="none" stroke="currentColor" strokeWidth={1.5}>
                          <path d="M6 11c0-2.828 0-4.243.879-5.121C7.757 5 9.172 5 12 5h3c2.828 0 4.243 0 5.121.879C21 6.757 21 8.172 21 11v5c0 2.828 0 4.243-.879 5.121C19.243 22 17.828 22 15 22h-3c-2.828 0-4.243 0-5.121-.879C6 20.243 6 18.828 6 16z"></path>
                          <path
                            d="M6 19a3 3 0 0 1-3-3v-6c0-3.771 0-5.657 1.172-6.828S7.229 2 11 2h4a3 3 0 0 1 3 3"
                            opacity={0.5}
                          ></path>
                        </g>
                      </svg>
                    </button>
                  </Tooltip>

                  {ownSnippet && snippets.totalFiles > 1 && (
                    <Tooltip
                      placement="top"
                      content="Delete file"
                      color="default"
                      size="sm"
                    >
                      <button
                        className="rounded-lg py-2 px-3 bg-slate-800 hover:bg-red-700 text-red-500 hover:text-white transition duration-300"
                        onClick={() => deleteFile(file.fid)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4"
                          viewBox="0 0 24 24"
                          color="currentColor"
                        >
                          <path
                            fill="currentColor"
                            d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
                          ></path>
                        </svg>
                      </button>
                    </Tooltip>
                  )}
                </div>
              </div>
              <div className="border border-gray-800 rounded-b-lg py-1 px-4 text-xs">
                <pre className={`language-${file.language}`}>
                  <code>{file.code}</code>
                </pre>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default Page;
