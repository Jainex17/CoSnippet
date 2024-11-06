"use client";

import { Button, Divider } from "@nextui-org/react";
import {
  ButtonGroup,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { IDE } from "@/components/IDE";
import { useAppContext } from "@/utils/AppContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

const CreateSnippet = () => {
  const { snippet, user, setSnippet, files, setFiles, handleCreateSnippet } =
    useAppContext();

  const handleAddFile = () => {
    setFiles([...files, { id: Date.now(), filename: "", code: "" }]);
  };

  const [selectedOption, setSelectedOption] = useState<string>("Create Public Snippet");

  
  useEffect(() => {
    if (user.username === "") {
      toast.error("Please Login");
      redirect("/");
    }
  }, [user.username]);

  return (
    <>
      <h2 className="text-xl md:text-2xl flex items-center gap-3 font-semibold mx-5 my-5 md:mx-20">
        <span aria-hidden="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className="w-8 md:w-10"
          >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
              <g opacity={0.2}>
                <path d="M2.59 10.331a1 1 0 0 1 1.412-.074l3.334 3a1 1 0 0 1-1.338 1.486l-3.334-3a1 1 0 0 1-.074-1.412"></path>
                <path d="M7.41 7.331a1 1 0 0 1-.074 1.412l-3.334 3a1 1 0 1 1-1.338-1.486l3.334-3a1 1 0 0 1 1.412.074m12 3a1 1 0 0 1-.074 1.412l-3.334 3a1 1 0 1 1-1.338-1.486l3.334-3a1 1 0 0 1 1.412.074"></path>
                <path d="M14.59 7.331a1 1 0 0 1 1.412-.074l3.334 3a1 1 0 0 1-1.338 1.486l-3.334-3a1 1 0 0 1-.074-1.412m-1.827-2.796a1 1 0 0 1 .702 1.228l-3 11a1 1 0 1 1-1.93-.526l3-11a1 1 0 0 1 1.228-.702"></path>
              </g>
              <path d="M1.962 9.666a.5.5 0 0 1 .706-.038l3.333 3a.5.5 0 1 1-.669.744l-3.333-3a.5.5 0 0 1-.037-.706"></path>
              <path d="M6.038 6.666a.5.5 0 0 1-.037.706l-3.333 3a.5.5 0 0 1-.67-.744l3.334-3a.5.5 0 0 1 .706.038m12 3a.5.5 0 0 1-.037.706l-3.333 3a.5.5 0 0 1-.67-.744l3.334-3a.5.5 0 0 1 .706.038"></path>
              <path d="M13.962 6.666a.5.5 0 0 1 .706-.038l3.333 3a.5.5 0 0 1-.669.744l-3.333-3a.5.5 0 0 1-.037-.706m-2.33-2.648a.5.5 0 0 1 .35.614l-3 11a.5.5 0 0 1-.964-.264l3-11a.5.5 0 0 1 .614-.35"></path>
            </g>
          </svg>
        </span>
        Create Snippets
      </h2>

      <Divider />

      <div className="my-8 max-w-3xl mx-10 md:mx-auto">
        <input
          className="w-full text-sm py-2 px-3 border border-gray-800 rounded-lg bg-[#201421] focus:outline-none focus:bg-black focus:border-blue-500"
          type="text"
          placeholder="Snippet title..."
          value={snippet.title}
          onChange={(e) => setSnippet({ ...snippet, title: e.target.value })}
        />

        {files.map((file, index) => (
          <IDE key={index} index={file.id} />
        ))}

        <div className="flex justify-between my-5 ">
          <Button
            className="bg-[#201421] py-2 px-5 rounded-md hover:bg-slate-800"
            onClick={handleAddFile}
          >
            Add file
          </Button>

          <ButtonGroup variant="flat">
            <Button className="bg-[#201421]" onClick={handleCreateSnippet}>{selectedOption}</Button>
            <Dropdown placement="bottom-end" className="bg-[#201421]">
              <DropdownTrigger>
                <Button isIconOnly className="bg-[#201421]">
                  <svg
                    fill="none"
                    height="14"
                    viewBox="0 0 24 24"
                    width="14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z"
                      fill="currentColor"
                    />
                  </svg>
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Select an option"
                selectionMode="single"
                className="max-w-[300px]"
                onAction={(key) => {setSelectedOption(key.toString()); setSnippet({ ...snippet, public: key.toString() === "Create Public Snippet" ? true : false })}}
                selectedKeys={new Set([selectedOption])}
              >
                <DropdownItem
                  key="Create Public Snippet"
                  description={"Everyone can see this snippet"}
                >
                  Create Public Snippet
                </DropdownItem>
                <DropdownItem
                  key="Create Private Snippet"
                  description={"Only you can see this snippet"}
                >
                  Create Private Snippet
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </ButtonGroup>
        </div>
      </div>
    </>
  );
};

export default CreateSnippet;
