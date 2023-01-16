import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero";
import CodeSnippets from "./pages/CodeSnippets";
import AutoCode from "./pages/AutoCode";
import ExplainCode from "./pages/ExplainCode";
import TranslateCode from "./pages/TranslateCode";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/code-snippets" element={<CodeSnippets />} />
      <Route path="/auto-code" element={<AutoCode />} />
      <Route path="/explain-code" element={<ExplainCode />} />
      <Route path="/translate-code" element={<TranslateCode />} />
    </Routes>
  </BrowserRouter>
);

export default App;
