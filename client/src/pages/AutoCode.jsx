import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import MyCodeBlock from "../components/MyCodeBlock";

const AutoCode = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://codehub-8sr2.onrender.com/autocode", {
        prompt: input,
      })
      .then((res) => {
        setOutput(res.data.output);
        console.log(res.data.output);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className='bg-primary h-screen overflow-hidden'>
      <Navbar />
      <div className='mx-5 sm:mx-20 mt-5 bg-neutral-900 rounded-lg'>
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
        <MyCodeBlock code={output} />
      </div>
      <Footer />
    </div>
  );
};

export default AutoCode;
