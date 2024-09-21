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
    language: "typescript",
    code: 
    `interface types {\n    id: number;\n}`}
];


export const Cards = () => {
  return (
    <>
      <div className="my-10 max-w-3xl mx-10 md:mx-auto">

      {snippet.map((snip, index) => (
        <Card key={index} snippet={snip} />
      ))}
      </div>
    </>
  );
};
