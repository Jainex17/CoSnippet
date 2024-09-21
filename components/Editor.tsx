"use client";

import { useAppContext } from "@/utils/AppContext";
import React, { useEffect, useRef, useState } from "react";

const Editor = ({ index }: { index: number }) => {
  const { files, setFiles } = useAppContext();
  const findidx = files.findIndex((file) => file.id === index);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<string[]>([]);

  const calculateNumLines = (str: string) => {
    const textarea = textareaRef.current!;

    const parseValue = (v: string) =>
      v.endsWith("px") ? parseInt(v.slice(0, -2), 10) : 0;

    const textareaWidth =
      textarea.getBoundingClientRect().width -
      parseValue(textarea.style.paddingLeft) -
      parseValue(textarea.style.paddingRight);
    const words = str.split(" ");
    let lineCount = 0;
    let currentLine = "";
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d")!;
    context.font = `${textarea.style.fontSize} ${textarea.style.fontFamily}`;

    words.forEach((word) => {
      const wordWidth = context.measureText(word + " ").width;
      const lineWidth = context.measureText(currentLine).width;

      if (lineWidth + wordWidth > textareaWidth) {
        lineCount++;
        currentLine = word + " ";
      } else {
        currentLine += word + " ";
      }
    });

    if (currentLine.trim() !== "") {
      lineCount++;
    }

    return lineCount;
  };

  const calculateLineNumbers = () => {
    const textarea = textareaRef.current!;

    const lines = textarea?.value.split("\n") || [];

    const numLines = lines?.map((line) => calculateNumLines(line));

    const lineNumbers: string[] = [];
    let i = 1;
    numLines.forEach((numLinesOfSentence) => {
      lineNumbers.push(i.toString());
      if (numLinesOfSentence > 1) {
        Array(numLinesOfSentence - 1)
          .fill("")
          .forEach(() => lineNumbers.push(""));
      }
      i++;
    });
    return lineNumbers;
  };

  useEffect(() => {
    const textarea = textareaRef.current!;
    const lineNumbersEle = lineNumbersRef.current!;

    const displayLineNumbers = () => {
      setLines(calculateLineNumbers());
    };

    const resizeObserver = new ResizeObserver(() => {
      lineNumbersEle.style.height = `${
        textarea.getBoundingClientRect().height
      }px`;
      displayLineNumbers();
    });

    resizeObserver.observe(textarea);

    textarea.addEventListener("scroll", () => {
      lineNumbersEle.scrollTop = textarea.scrollTop;
    });

    displayLineNumbers();

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLines(calculateLineNumbers());
    setFiles(
      files.map((f) =>
        f.id === index ? { ...f, code: e.target.value } : f
      )
    );
  };

  return (
    <div className="flex border border-gray-800 overflow-hidden h-80 max-h-80">
      <div
        ref={lineNumbersRef}
        className="py-2 pl-3 pr-4 text-right overflow-hidden text-xs text-[#9198a1] leading-normal"
      >
        {lines.map((line, idx) => (
          <div key={idx}>{line || "\u00A0"}</div>
        ))}
      </div>

      <textarea
        ref={textareaRef}
        className="w-full border-none outline-none p-2 resize-none text-xs bg-black leading-normal"
        placeholder="Write your code here..."
        onChange={handleCodeChange}
        value={files[findidx]?.code || ""}
      />
    </div>
  );
};

export default Editor;
