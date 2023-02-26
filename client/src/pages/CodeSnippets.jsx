import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import { programmingLangs } from "../constants";
import { programmingSnippets } from "../constants";
import avatar from "../assets/avatar.svg";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import Chatbot from "../components/Chatbot";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

const CodeSnippets = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [showModal, setShowModal] = useState(false);
  const [selectedSnippet, setSelectedSnippet] = useState(null);

  const handleClick = (snippet) => {
    setSelectedSnippet(snippet);
    setShowModal(true);
  };

  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to='/' />;
  }

  return (
    <div className='bg-primary flex flex-col w-full min-h-screen text-gray-200'>
      <Navbar />
      <div className='sm:flex justify-between sm:mx-16 mx-6 my-4'>
        {/* ====== Languages ====== */}
        {/* <div className='sm:w-[15%]'>
          <div className='font-poppins font-medium text-base text-center mb-4 text-white bg-gray-gradient p-2 rounded-xl'>
            Languages
          </div>
          <div className=' sm:h-[70vh] h-auto overflow-auto'>
            <ul className='list-none'>
              {programmingLangs.map((langs) => (
                <li
                  key={langs.title}
                  className='font-poppins font-medium text-base'
                >
                  <div className='inline-flex m-4'>
                    <img
                      src={`${langs.icon}`}
                      alt={`${langs.id}`}
                      className='w-[28px] h-[28px] object-contain mr-4'
                    />
                    {langs.title}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div> */}
        {/* ====== End Languages ====== */}

        {/* ====== Chatbot ====== */}
        <div className='sm:w-[40%] sm:order-2 sm:mr-16 sm:mb-0 mb-6'>
          <div className='font-poppins font-normal text-base text-center mb-4 text-white bg-gray-gradient p-2 rounded-lg'>
            CodeHub Chatbot
          </div>
          <Chatbot />
        </div>
        {/* ====== End Chatbot ====== */}

        {/* ====== Code Snippets ====== */}
        <div className='sm:w-[40%] sm:order-1 sm:ml-16'>
          <div className='font-poppins font-normal text-base text-center mb-4 text-white bg-gray-gradient p-2 rounded-lg'>
            Code Snippets
          </div>
          <div className='overflow-auto'>
            <div className='sm:h-[70vh] h-auto overflow-auto'>
              <ul>
                {programmingSnippets.map((snippets) => (
                  <li key={snippets.id} onClick={() => handleClick(snippets)}>
                    <div className='bg-gray-gradient p-3 rounded-lg mb-3 cursor-pointer'>
                      <div className='inline-flex font-[300] text-gray-400 font-poppins'>
                        <img
                          src={avatar}
                          alt='avatar'
                          className='w-[28px] h-[28px] object-contain mr-2'
                        />
                        @{snippets.author}
                      </div>
                      <div className='py-4 font-normal'>{snippets.title}</div>
                      <hr></hr>
                      <div className='inline-flex justify-between pt-3'>
                        <img
                          src={snippets.icon}
                          alt={snippets.id}
                          className='w-[28px] h-[28px] object-contain mr-8'
                        />
                        <div className='bg-slate-600 px-4 rounded-md float-right'>
                          {snippets.lang}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* ====== End Code Snippets ====== */}

        {/* ====== Modal ====== */}
        {showModal && (
          <div className='fixed top-[10vh] w-full justify-center'>
            <div className='rounded-lg overflow-hidden bg-[#1a1e22] sm:w-[45%] w-[90%] sm:h-[80vh] h-[70vh] text-center'>
              <div className='title-bar'>
                <div className='p-2'>
                  {selectedSnippet && selectedSnippet.title}
                  <button
                    className='text-white bg-gray-900 rounded-sm hover:bg-gray-400 px-2 float-right'
                    onClick={() => setShowModal(false)}
                  >
                    X
                  </button>
                </div>
              </div>
              <div className='editor_wrap'>
                <Editor
                  value={selectedSnippet && selectedSnippet.code}
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
        )}
        {/* ====== End Modal ====== */}
      </div>
      <Footer />
    </div>
  );
};

export default CodeSnippets;
