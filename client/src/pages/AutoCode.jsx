import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

const inputPrompt = `Write code to setup an express app`;

const outputCode = `const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});`;

const AutoCode = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [input, setInput] = useState(inputPrompt);
  const [output, setOutput] = useState(outputCode);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/auto`, {
        prompt: input,
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
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to='/' />;
  }

  return (
    <div className='bg-primary text-white flex flex-col w-full min-h-screen'>
      <Navbar />
      <div className='mx-6 sm:mx-20 my-4 rounded-lg'>
        {/* <========== Input Form ===========> */}
        <div className='bg-neutral-700 rounded-lg'>
          <form onSubmit={handleSubmit} className=''>
            <div className='px-4 py-2 flex items-center'>
              <input
                type='text'
                value={input}
                placeholder='Wite your prompt to generate code...'
                onChange={(event) =>
                  setInput(
                    event.target.value.charAt(0).toUpperCase() +
                      event.target.value.slice(1)
                  )
                }
                className='bg-inherit border-none outline-none text-white w-full '
              />
              <button type='submit' className='ml-2 text-slate-300'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='bg-gray-700'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5'
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
        {/* <========== Input Form ===========> */}

        {/* <============= CodeViewer =============> */}
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
              value={output}
              onValueChange={(output) => setCode(output)}
              highlight={(output) => highlight(output, languages.js)}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
              }}
            />
          </div>
        </div>
        {/* <=========== CodeViewer ===========> */}
      </div>
      <Footer />
    </div>
  );
};

export default AutoCode;
