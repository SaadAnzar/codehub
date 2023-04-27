import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Chatbot from "../components/Chatbot";
import Languages from "../components/Languages";
import Feed from "../components/Feed";
import { useAuth0 } from "@auth0/auth0-react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";

const CodeSnippets = () => {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [toggleSidebar, setToggleSidebar] = useState(false);

  {
    !isAuthenticated && navigate("/");
  }

  return (
    <div className='bg-primary flex flex-col w-full min-h-screen text-gray-200'>
      <Navbar />
      <div className='sm:flex justify-between sm:mx-16 mx-6 my-4'>
        <div className='sm:w-[35%] sm:order-2 sm:mb-0 mb-6'>
          <Chatbot />
        </div>

        <div className='sm:w-[20%]'>
          <div className='hidden sm:block'>
            <div className='font-poppins font-medium text-base text-center mb-4 text-white bg-gray-gradient p-2 rounded-xl'>
              Languages
            </div>
            <span className='text-gray-400 text-sm p-4'>Browse Languages</span>
            <Languages />
          </div>
          <div className='flex sm:hidden pb-3'>
            <HiMenu
              fontSize={30}
              className='cursor-pointer'
              onClick={() => setToggleSidebar(true)}
            />
            {toggleSidebar && (
              <div className='relative w-[90vw] bg-primary overflow-y-auto shadow-md z-10 animate-slide-in right-6'>
                <div className='absolute w-full flex justify-end items-center p-2'>
                  <AiFillCloseCircle
                    fontSize={30}
                    className='cursor-pointer'
                    onClick={() => setToggleSidebar(false)}
                  />
                </div>
                <div className='font-poppins font-medium text-base text-center mb-4 text-white bg-gray-gradient p-2 rounded-xl'>
                  Languages
                </div>
                <Languages closeToggle={setToggleSidebar} />
              </div>
            )}
          </div>
        </div>
        <Feed />
      </div>
    </div>
  );
};

export default CodeSnippets;
