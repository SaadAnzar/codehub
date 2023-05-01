import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Spinner from '../components/Spinner'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

const codeSnippet = `def factorial(n):
if n == 0:
    return 1
else:
    return n * factorial(n-1)

num = int(input("Enter a number: "));

print("The factorial of", num, "is", factorial(num));
`

const explainedCode = `• This code is used to calculate the factorial of a given number.
• The function 'factorial' takes an argument 'n' and checks if it is equal to 0.
• If it is equal to 0, it returns 1.
• If it is not equal to 0, it returns the value of 'n' multiplied by the result of the same function with argument 'n-1'.
• The variable 'num' is used to store the input from the user.
• The input is taken as an integer and stored in the variable 'num'.
• Finally, the factorial of the number stored in 'num' is calculated using the function 'factorial' and printed out.`

const ExplainCode = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const navigate = useNavigate()

  const [code, setCode] = useState(codeSnippet)
  const [output, setOutput] = useState(explainedCode)

  const handleSubmit = (e) => {
    e.preventDefault()

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/explain`, {
        prompt: code,
      })
      .then((res) => {
        setOutput(res.data.output)
        // console.log(res.data.output);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const { isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return <Spinner />
  }

  if (!isAuthenticated) navigate('/')

  return (
    <div className="bg-primary text-white flex flex-col w-full min-h-screen">
      <Navbar />
      <div className="sm:flex justify-between sm:mx-16 mx-6 my-4">
        <div className="sm:w-[40vw]">
          <div className="App">
            <div className="window">
              <div className="title-bar">
                <div className="title-buttons">
                  <div className="title-button"></div>
                  <div className="title-button"></div>
                  <div className="title-button"></div>
                </div>
              </div>
              <div className="editor_wrap">
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
            className="m-2 text-slate-300 bg-black-gradient border rounded-md px-4 py-2 font-medium text-base
          hover:text-slate-500 focus:outline-none"
          >
            Explain {''}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="bg-gray-700"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-[18px] h-[18px] inline-block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
        <div className="sm:w-[40vw] sm:h-[calc(58vh+35px)] my-2 rounded-lg bg-[#1a1e22] text-gray-300">
          <div className="title-bar">
            <div className="title-buttons">
              <div className="px-5">Explanation</div>
            </div>
          </div>
          <div className="sm:h-[56vh] h-auto overflow-auto">
            <ul className="px-5 py-3">
              {output.split('\n').map((out, index) => {
                return (
                  <li className="p-2" key={index}>
                    {out}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExplainCode
