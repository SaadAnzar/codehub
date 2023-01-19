import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const codeSnippet = `
#include <iostream>
using namespace std;

int binarySearch(int arr[], int l, int r, int x) {
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (arr[m] == x) 
            return m;  
        if (arr[m] < x) 
            l = m + 1; 
        else
            r = m - 1;
    }
    return -1;
}
int main() {
    int arr[] = { 2, 3, 4, 10, 40 };
    int x = 10;
    int n = sizeof(arr) / sizeof(arr[0]);
    int result = binarySearch(arr, 0, n - 1, x);
    (result == -1) ? cout << "Element is not present in array"
                   : cout << "Element is present at index " << result;
    return 0;
}`;

const translatedCode = `
def binary_search(arr, l, r, x):
    while l <= r:
        m = l + (r - l) // 2
        if arr[m] == x:
            return m
        elif arr[m] < x:
            l = m + 1
        else:
            r = m - 1
    return -1

arr = [2, 3, 4, 10, 40]
x = 10
n = len(arr)
result = binary_search(arr, 0, n - 1, x)

if result != -1:
    print("Element is present at index", result)
else:
    print("Element is not present in array")`;

const TranslateCode = () => {
  const [code, setCode] = useState(codeSnippet);
  const [output, setOutput] = useState(translatedCode);
  const [firstl, setFirstl] = useState("C++");
  const [secondl, setSecondl] = useState("Python");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://codehub-8sr2.onrender.com/translatecode", {
        prompt: code,
        first_language: firstl,
        second_language: secondl,
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
    <div className='bg-primary w-full h-screen overflow-hidden'>
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
                    onChange={(event) =>
                      setFirstl(
                        event.target.value.charAt(0).toUpperCase() +
                          event.target.value.slice(1)
                      )
                    }
                    className='bg-inherit border-none outline-none text-white w-full '
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
                    onChange={(event) =>
                      setSecondl(
                        event.target.value.charAt(0).toUpperCase() +
                          event.target.value.slice(1)
                      )
                    }
                    className='bg-inherit border-none outline-none text-white w-full '
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

      <Footer />
    </div>
  );
};

export default TranslateCode;
