import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CodeSnippets from "./pages/CodeSnippets";
import AutoCode from "./pages/AutoCode";
import ExplainCode from "./pages/ExplainCode";
import TranslateCode from "./pages/TranslateCode";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/codeSnippets' element={<CodeSnippets />} />
      <Route path='/autoCode' element={<AutoCode />} />
      <Route path='/explainCode' element={<ExplainCode />} />
      <Route path='/translateCode' element={<TranslateCode />} />
    </Routes>
  </BrowserRouter>
);

export default App;
