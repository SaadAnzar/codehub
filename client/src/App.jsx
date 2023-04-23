import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CodeSnippets from "./pages/CodeSnippets";
import AutoCode from "./pages/AutoCode";
import ExplainCode from "./pages/ExplainCode";
import TranslateCode from "./pages/TranslateCode";
import NotFoundPage from "./pages/NotFoundPage";
import CreateSnippet from "./components/CreateSnippet";
import SnippetDetail from "./components/SnippetDetail";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/codesnippets' element={<CodeSnippets />} />
      <Route
        path='/codesnippets/language/:languageId'
        element={<CodeSnippets />}
      />
      <Route path='/codesnippets/create-snippet' element={<CreateSnippet />} />
      <Route
        path='/codesnippets/snippet-detail/:snippetId'
        element={<SnippetDetail />}
      />
      <Route path='/autocode' element={<AutoCode />} />
      <Route path='/explaincode' element={<ExplainCode />} />
      <Route path='/translatecode' element={<TranslateCode />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
