import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import LanguageDetect from "languagedetect";

const lngDetector = new LanguageDetect();

const styles = {
  backgroundColor: "rgb(23 23 23)",
  color: "white",
  maxHeight: "65vh",
  border: "none",
  overflow: "auto",
};

function MyCodeBlock({ code }) {
  const language = lngDetector.detect(code);

  return (
    <SyntaxHighlighter
      language={language}
      style={dark}
      customStyle={styles}
      className='scroll-m-8'
    >
      {code}
    </SyntaxHighlighter>
  );
}

export default MyCodeBlock;
