"use client";

import { Tooltip } from "@nextui-org/react";
import Editor from "./Editor";
import { useAppContext } from "@/utils/AppContext";

export const IDE = ({ index }: { index: number }) => {
  
  const { files, setFiles } = useAppContext();
  const findindex = files.findIndex((file) => file.id === index);

  const handleFileTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(
      files.map((f) =>
        f.id === index ? { ...f, filename: e.target.value } : f
      )
    );
  };

  const handleDeleteFile = (id: number) => {
    setFiles(files.filter((f) => f.id !== id));
  }

  return (
    <>
      <div className="bg-[#201421] w-full rounded-t-lg mt-4 py-1 px-2 flex items-center gap-2">
        <input
          className="py-1 px-3 text-sm w-1/3 border border-gray-800 rounded-lg focus:outline-none bg-black focus:border-blue-500"
          type="text"
          placeholder="Filename including extension..."
          value={files[findindex].filename}
          onChange={handleFileTitleChange}
        />

        {files.length > 1 && (

        <Tooltip
          placement="bottom"
          content="Delete file"
          color="default"
          size="sm"
        >
          <button className="bg-slate-800 p-1 rounded-lg"
            onClick={() => handleDeleteFile(index)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5"
              viewBox="0 0 24 24"
            >
              <path
                fill="red"
                d="M16 9v10H8V9zm-1.5-6h-5l-1 1H5v2h14V4h-3.5zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2z"
              ></path>
            </svg>
          </button>
        </Tooltip>
        )}
      </div>

      <Editor index={index} />

      <div className="bg-[#201421] w-full rounded-b-lg h-7 py-1 px-2" />
    </>
  );
};
