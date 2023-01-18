// import React, { useState } from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import axios from "axios";
// import MyCodeBlock from "../components/MyCodeBlock";
// import CodeInput from "../components/CodeInput";
// import { Controlled as CodeMirror } from "react-codemirror2";
// import LanguageDetect from "languagedetect";

// import "codemirror/lib/codemirror.css";
// import "codemirror/theme/material.css";

// const lngDetector = new LanguageDetect();

// const ExplainCode = () => {
//   const [code, setCode] = useState("");
//   const [output, setOutput] = useState("");
//   const [language, setLanguage] = useState("javascript");

//   const detectLanguage = (code) => {
//     const detectedLanguage = lngDetector.detect(code);
//     setLanguage(detectedLanguage);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     axios
//       .post("http://localhost:5000/explaincode", {
//         prompt: code,
//       })
//       .then((res) => {
//         setOutput(res.data.output);
//         console.log(res.data.output);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   return (
//     <div className='bg-primary h-screen overflow-hidden'>
//       <Navbar />
//       <div className='mx-5 sm:mx-20 mt-5 bg-neutral-900 rounded-lg'>
//         <div>
//           <CodeMirror
//             value={code}
//             options={{
//               mode: language,
//               theme: "material",
//               lineNumbers: true,
//             }}
//             onBeforeChange={(editor, data, value) => {
//               setCode(value);
//               detectLanguage(value);
//             }}
//             onChange={(editor, data, value) => {}}
//             onClick={handleSubmit}
//           />
//         </div>

//         {/* <div className='bg-neutral-700 rounded-lg'>
//           <form onSubmit={handleSubmit} className=''>
//             <div className='px-4 py-2 flex items-center'>
//               <input
//                 type='text'
//                 value={input}
//                 placeholder='Wite your prompt to generate code...'
//                 onChange={(event) =>
//                   setInput(
//                     event.target.value.charAt(0).toUpperCase() +
//                       event.target.value.slice(1)
//                   )
//                 }
//                 className='bg-inherit border-none outline-none text-white w-full '
//               />
//               <button type='submit' className='ml-2 text-slate-300'>
//                 <svg
//                   xmlns='http://www.w3.org/2000/svg'
//                   fill='bg-gray-700'
//                   viewBox='0 0 24 24'
//                   strokeWidth='1.5'
//                   stroke='currentColor'
//                   className='w-6 h-6'
//                 >
//                   <path
//                     strokeLinecap='round'
//                     strokeLinejoin='round'
//                     d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5'
//                   />
//                 </svg>
//               </button>
//             </div>
//           </form>
//         </div> */}
//         {/* <CodeInput /> */}
//         {/* <MyCodeBlock code={output} /> */}
//         <div>
//           <h1 className='3xl text-white'>{output}</h1>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default ExplainCode;

import React, { useRef } from "react";
// import CodeMirror from "codemirror";
// import "codemirror/lib/codemirror.css";
// import "codemirror/mode/javascript/javascript";
// import "codemirror/mode/python/python";
// import "codemirror/mode/xml/xml";
// import "codemirror/mode/htmlmixed/htmlmixed";
// import "codemirror/mode/css/css";

const ExplainCode = () => {
  const editorRef = useRef(null);

  const handleCodeChange = (editor, data, code) => {
    // Send code to OpenAI model for explanation
  };

  const codeEditorRef = useRef(null);
  useEffect(() => {
    codeEditorRef.current = CodeMirror(editorRef.current, {
      mode: "text/plain",
      lineNumbers: true,
      lineWrapping: true,
      autoCloseBrackets: true,
      matchBrackets: true,
      styleActiveLine: true,
      gutters: ["CodeMirror-lint-markers"],
      lint: true,
      theme: "material",
      indentWithTabs: false,
      extraKeys: {
        "Ctrl-Space": "autocomplete",
        "Ctrl-S": function (cm) {
          handleCodeChange(cm);
        },
        "Ctrl-J": "toMatchingTag",
      },
      hintOptions: {
        completeSingle: false,
        alignWithWord: true,
        closeCharacters: /[\s()\[\]{};:>,]/,
        closeOnUnfocus: true,
        completeOnSingleClick: true,
        container: document.body,
      },
      onChange: function (cm) {
        cm.save();
      },
    });
    codeEditorRef.current.on("change", function (instance, changeObj) {
      if (changeObj.text.length === 1 && changeObj.text[0] === "`") {
        codeEditorRef.current.setOption("mode", "text/x-sql");
      }
      if (changeObj.text.length === 1 && changeObj.text[0] === "#") {
        codeEditorRef.current.setOption("mode", "python");
      }
      if (
        changeObj.text.length === 2 &&
        changeObj.text[0] === "<" &&
        changeObj.text[1] === "!"
      ) {
        codeEditorRef.current.setOption("mode", "text/html");
      }
      if (
        changeObj.text.length === 2 &&
        changeObj.text[0] === "{" &&
        changeObj.text[1] === "{"
      ) {
        codeEditorRef.current.setOption("mode", "javascript");
      }
    });
  }, []);

  return (
    <div>
      <div ref={editorRef} />
      <button onClick={() => handleCodeChange(codeEditorRef.current)}>
        Explain Code
      </button>
    </div>
  );
};

export default ExplainCode;
