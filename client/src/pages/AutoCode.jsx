import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../style";

const AutoCode = () => {
  return (
    <>
      <div className='bg-primary w-full min-h-screen overflow-hidden'>
        <Navbar />
        <div className='w-1/2 ml-4'>
          <h1 className='3xl text-white'>Translate</h1>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default AutoCode;
