import React, { useState, useEffect } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import axios from "axios";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

const codeSnippet = `#include <iostream>
using namespace std;

int main()
{
    int num, reversedNum = 0, remainder;

    cout << "Enter an integer: ";
    cin >> num;

    while(num != 0) {
        remainder = num % 10;
        reversedNum = reversedNum * 10 + remainder;
        num /= 10;
    }
    cout << "Reversed Number = " << reversedNum;
    return 0;
}`;

const translatedCode = `let num, reversedNum = 0, remainder;

console.log("Enter an integer: ");
num = prompt();

while(num != 0) {
    remainder = num % 10;
    reversedNum = reversedNum * 10 + remainder;
    num /= 10;
}

console.log("Reversed Number = " + reversedNum);`;

const TranslateCode = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [code, setCode] = useState(codeSnippet);
  const [output, setOutput] = useState(translatedCode);
  const [firstl, setFirstl] = useState("C++");
  const [secondl, setSecondl] = useState("JavaScript");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/translate`, {
        prompt: code,
        first_language: firstl,
        second_language: secondl,
      })
      .then((res) => {
        setOutput(res.data.output);
        // console.log(res.data.output);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to='/' />;
  }

  return (
    <div className='bg-primary text-white flex flex-col w-full min-h-screen'>
      <Navbar />

      <div className='sm:flex justify-between sm:mx-16 mx-6 my-4'>
        <div className='sm:w-[40vw]'>
          <div className='App'>
            <div className='window'>
              <div className='title-bar'>
                <div className='title-buttons'>
                  <input
                    type='text'
                    value={firstl}
                    placeholder='Translate from...'
                    onChange={(event) => setFirstl(event.target.value)}
                    className='bg-inherit border-none outline-none text-white w-full capitalize px-4'
                  />
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
            Translate {""}
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
        <div className='sm:w-[40vw]'>
          <div className='App'>
            <div className='window'>
              <div className='title-bar'>
                <div className='title-buttons'>
                  <input
                    type='text'
                    value={secondl}
                    placeholder='Translate to...'
                    onChange={(event) => setSecondl(event.target.value)}
                    className='bg-inherit border-none outline-none text-white w-full capitalize px-4'
                  />
                </div>
              </div>
              <div className='editor_wrap'>
                <Editor
                  readOnly={true}
                  value={output}
                  onValueChange={(output) => setOutput(output)}
                  highlight={(output) => highlight(output, languages.js)}
                  padding={10}
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslateCode;
