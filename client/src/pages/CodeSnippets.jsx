import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../style";

const CodeSnippets = () => {
  return (
    <>
      <div
        className={`bg-primary w-full h-screen overflow-hidden ${styles.flexStart}`}
      >
        <Navbar />
        <div className="grid grid-cols-3">
          <div className="col-span-1 bg-gray-300">Column 1</div>
          <div className="col-span-3 bg-gray-400">Column 2</div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CodeSnippets;
