import React, { useEffect } from "react";
import styles from "../style";
import ai from "../assets/ai.png";
import GetStarted from "../components/GetStarted";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { client } from "../client";

const Home = () => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = () => {
    if (isAuthenticated) {
      navigate("/codesnippets");
    } else {
      loginWithRedirect();
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify(user));
      // console.log("User saved to localStorage", localStorage.getItem("user"));
      // Create a new user document in Sanity
      const { name, nickname, sub, picture } = user;

      const doc = {
        _id: sub.substring(sub.indexOf("|") + 1),
        _type: "user",
        userName: name,
        nickName: nickname,
        image: picture,
      };

      client.createIfNotExists(doc).then(() => {
        // console.log("User document created in Sanity", doc);
      });
    }
  }, [isAuthenticated, user]);

  return (
    <div
      className={`bg-primary w-full min-h-screen overflow-hidden ${styles.flexStart}`}
    >
      <div className={`${styles.boxWidth}`}>
        <section
          id='home'
          className={`flex md:flex-row h-full flex-col ${styles.paddingY}`}
        >
          <div
            className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}
          >
            <div className='flex flex-row justify-between items-center w-full'>
              <h1 className='flex-1 font-poppins font-semibold ss:text-[52px] text-[32px] text-white ss:leading-[80.8px] leading-[55px]'>
                <span className='text-gradient'>CodeHub {"{}"}</span> <br />{" "}
                <span>The Next Generation</span>{" "}
              </h1>
              <div className='ss:flex hidden md:mr-4 mr-0'>
                <button onClick={handleLogin}>
                  <GetStarted />
                </button>
              </div>
            </div>

            <h1 className='font-poppins font-semibold ss:text-[58px] text-[32px] text-white ss:leading-[80.8px] leading-[55px] w-full'>
              Coding Assistant.
            </h1>
            <p className={`${styles.paragraph} max-w-[570px] mt-5`}>
              <em>CodeHub</em> is an essential tool for any programmer. It is a
              reference guide that contains all the information needed to write
              software code. Codebook is very general in nature, containing
              information about multiple programming languages. This can be
              helpful for those who are just starting to learn coding or for
              those who need a refresher on different languages. It is a go to
              website to make sure that you have all the information you need to
              write software code.
            </p>
          </div>

          <div
            className={`flex-1 flex ${styles.flexCenter} md:my-0 my-5 relative`}
          >
            <img
              src={ai}
              alt='CodeAI'
              className='w-[85%] h-[85%] relative z-[5]'
            />

            {/* gradient start */}
            <div className='absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient' />
            <div className='absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40' />
            <div className='absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient' />
            {/* gradient end */}
          </div>

          <div className={`ss:hidden mb-1 ${styles.flexCenter}`}>
            <button onClick={handleLogin}>
              <GetStarted />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
