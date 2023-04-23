import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { client } from "../client";
import { programmingLangs } from "../constants";
import Navbar from "./Navbar";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import { fetchUser } from "../utils/fetchUser";
import { v4 as uuidv4 } from "uuid";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./Loading";
import Footer from "./Footer";

const codeSnippet = `function add(a, b) {
  return a + b;
}

add(5, 10);
// Output: 15
`;

const CreateSnippet = () => {
  const [code, setCode] = useState(codeSnippet);
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [fields, setFields] = useState(false);

  const navigate = useNavigate();

  const userInfo = fetchUser();

  const saveSnippet = () => {
    if (title && language && code) {
      const doc = {
        _type: "snippet",
        title,
        language,
        code: [
          {
            _type: "code",
            _key: uuidv4(),
            code,
          },
        ],
        userId: userInfo?.sub.substring(userInfo?.sub.indexOf("|") + 1),
        postedBy: {
          _type: "postedBy",
          _ref: userInfo?.sub.substring(userInfo?.sub.indexOf("|") + 1),
        },
      };
      client.create(doc).then(() => {
        navigate("/codesnippets");
      });
    } else {
      setFields(true);

      setTimeout(() => {
        setFields(false);
      }, 2000);
    }
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
      <div className='sm:mx-12 mx-4'>
        <div className='px-4 py-2 items-center border-neutral-800 border-2 border-dashed rounded-lg'>
          <h1 className='text-2xl text-center font-bold font-poppins'>
            Create Code Snippet
          </h1>
          {fields && (
            <p className='text-red-500 text-center text-2xl transition-all duration-150 ease-in '>
              Please add all fields.
            </p>
          )}
          <div className='sm:flex justify-between my-4 p-2'>
            <div className='sm:w-[40vw] mt-3 mb-8'>
              <div className='flex flex-col py-2'>
                <label htmlFor='title' className='text-2xl font-bold m-2'>
                  Title
                </label>
                <input
                  type='text'
                  value={title}
                  // onChange={(e) => setTitle(e.target.value)}
                  onChange={(e) =>
                    setTitle(
                      e.target.value.replace(/\b\w/g, (l) => l.toUpperCase())
                    )
                  }
                  placeholder='Add your title'
                  className='bg-[#1a1e22] border-none outline-none w-full p-3 rounded-lg capitalize'
                />
              </div>
              <div className='flex flex-col py-2'>
                <label htmlFor='language' className='text-2xl font-bold m-2'>
                  Language
                </label>

                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className='bg-[#1a1e22] border-none p-3 rounded-lg outline-none'
                >
                  <option value='other'>-Select Language-</option>
                  {programmingLangs.map((langs) => (
                    <option key={langs.id} value={langs.title}>
                      {langs.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className='sm:w-[40vw]'>
              <div className='App'>
                <div className='window sm:h-[55vh]'>
                  <div className='title-bar'>
                    <div className='title-buttons'>
                      <div className='px-5'>Enter your code here</div>
                    </div>
                  </div>
                  <div className='editor_wrap sm:h-[57vh] h-[50vh] !important'>
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
            </div>
          </div>
          <div className='flex justify-center'>
            <button
              type='button'
              onClick={saveSnippet}
              className='m-2 text-slate-300 bg-black-gradient border rounded-md px-4 py-2 font-medium text-base hover:text-slate-500 focus:outline-none'
            >
              Create Snippet
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateSnippet;
