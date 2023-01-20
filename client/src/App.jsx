import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import CodeSnippets from "./pages/CodeSnippets";
import AutoCode from "./pages/AutoCode";
import ExplainCode from "./pages/ExplainCode";
import TranslateCode from "./pages/TranslateCode";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      {/* <Route path='/codeSnippets' element={<CodeSnippets />} /> */}
      <Route path='/autocode' element={<AutoCode />} />
      <Route path='/explaincode' element={<ExplainCode />} />
      <Route path='/translatecode' element={<TranslateCode />} />
      <Route path='*' element={<p>Page not found</p>} />
    </Routes>
  </BrowserRouter>
);

export default App;
