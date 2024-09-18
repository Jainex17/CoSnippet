import { Divider } from "@nextui-org/react";
import { Card } from "./Card";

const snippet = [
  {
    language: "jsx",
    code: `import React from 'react'
import ReactDOM from 'react-dom'
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'

const markdown = "
# Your markdown here
"

ReactDOM.render(
  <Markdown rehypePlugins={[rehypeHighlight]}>{markdown}</Markdown>,
  document.querySelector('#content')
)`
  },
  {
    language: "python",
    code: 
    `def hello_world():
  print("Hello, World!")`
  }
];


export const Cards = () => {
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
          Discover Snippets
        </h2>

        <Divider />

      <div className="my-10 max-w-3xl mx-10 md:mx-auto">

      {snippet.map((snip, index) => (
        <Card key={index} snippet={snip} />
      ))}
      </div>
    </>
  );
};
