import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import axios from "axios";

const codeSnippet = `
function add(a, b) {
  return a + b;
}

add(5, 10);
// Output: 15
`;

const explainedCode = `• This code is a function called "add" that takes two parameters, "a" and "b". 
• The function adds the two parameters together and returns the result. 
• In this example, the parameters are 5 and 10, so the result of the function is 15.`;

const ExplainCode = () => {
  const [code, setCode] = useState(codeSnippet);
  const [output, setOutput] = useState(explainedCode);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://codehub-8sr2.onrender.com/explain", {
        prompt: code,
      })
      .then((res) => {
        setOutput(res.data.output);
        // console.log(res.data.output);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='bg-primary flex flex-col w-full h-screen'>
      <Navbar />
      <div className='sm:flex justify-between sm:mx-16 mx-6 my-4'>
        <div className='sm:w-[40vw]'>
          <div className='App'>
            <div className='window'>
              <div className='title-bar'>
                <div className='title-buttons'>
                  <div className='title-button'></div>
                  <div className='title-button'></div>
                  <div className='title-button'></div>
                </div>
              </div>
              <div className='editor_wrap'>
                <Editor
                  value={code}
                  onValueChange={(code) => setCode(code)}
                  highlight={(code) => highlight(code, languages.js)}
                  padding={10}
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,
                  }}
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className='m-2 text-slate-300 bg-black-gradient border rounded-md px-4 py-2 font-medium text-base
          hover:text-slate-500 focus:outline-none'
          >
            Explain {""}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='bg-gray-700'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-[18px] h-[18px] inline-block'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5'
              />
            </svg>
          </button>
        </div>
        <div className='sm:w-[40vw] sm:h-[calc(57vh+35px)] my-2 rounded-lg bg-[#1a1e22] text-gray-300'>
          <div className='title-bar'>
            <div className='title-buttons'>
              <div className='px-5'>Explanation</div>
            </div>
          </div>
          <div className='sm:h-[57vh] h-[23vh] overflow-auto'>
            <ul className='px-5 py-3'>
              {output.split("\n").map((out, index) => {
                return (
                  <li className='p-2' key={index}>
                    {out}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ExplainCode;
