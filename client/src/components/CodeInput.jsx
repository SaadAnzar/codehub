import React, { useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import LanguageDetect from "languagedetect";

require("codemirror/lib/codemirror.css");
require("codemirror/theme/material.css");

const lngDetector = new LanguageDetect();

function CodeInput() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");

  const detectLanguage = (code) => {
    const detectedLanguage = lngDetector.detect(code);
    setLanguage(detectedLanguage);
  };

  return (
    <CodeMirror
      value={code}
      options={{
        mode: language,
        theme: "material",
        lineNumbers: true,
      }}
      onBeforeChange={(editor, data, value) => {
        setCode(value);
        detectLanguage(value);
      }}
      onChange={(editor, data, value) => {}}
    />
  );
}

export default CodeInput;
