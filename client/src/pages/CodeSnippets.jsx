import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Chatbot from '../components/Chatbot'
import Languages from '../components/Languages'
import Feed from '../components/Feed'
import { useAuth0 } from '@auth0/auth0-react'
import { HiMenu } from 'react-icons/hi'
import { AiFillCloseCircle } from 'react-icons/ai'
import { IoMdSearch } from 'react-icons/io'

const CodeSnippets = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [languageId, setLanguageId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [toggleSidebar, setToggleSidebar] = useState(false)

  const navigate = useNavigate()

  const { isAuthenticated } = useAuth0()

  if (!isAuthenticated) navigate('/')

  return (
    <div className="bg-primary flex flex-col w-full min-h-screen text-gray-200">
      <Navbar />

      <div className="sm:flex justify-between sm:mx-16 mx-6 my-4">
        <div className="sm:w-[35%] sm:order-2 sm:mb-0 mb-6">
          <Chatbot />
        </div>
        <div className="flex flex-col sm:w-[60%]">
          {/* Add Search here */}
          <div className="flex justify-start items-center px-2 mb-4 rounded-lg bg-gray-gradient border-none outline-none focus-within:shadow-sm">
            <IoMdSearch fontSize={21} className="mx-1" />
            <input
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for Code Snippets..."
              value={searchTerm}
              className="p-2 w-full bg-gray-gradient outline-none"
            />
          </div>
          {/* End Search here */}
          <div className="sm:flex gap-x-8 sm:p-2">
            <div className="sm:w-[35%]">
              <div className="hidden sm:block">
                <div className="font-poppins font-medium text-base text-center mb-4 text-white bg-gray-gradient p-2 rounded-xl">
                  Browse Languages
                </div>
                {/* <span className="text-gray-400 text-sm p-4">
                  Browse Languages
                </span> */}
                <Languages setLanguageId={setLanguageId} />
              </div>
              <div className="flex sm:hidden pb-3">
                <HiMenu
                  fontSize={30}
                  className="cursor-pointer"
                  onClick={() => setToggleSidebar(true)}
                />
                {toggleSidebar && (
                  <div className="relative w-[90vw] bg-primary overflow-y-auto shadow-md z-10 animate-slide-in right-6">
                    <div className="absolute w-full flex justify-end items-center p-2">
                      <AiFillCloseCircle
                        fontSize={30}
                        className="cursor-pointer"
                        onClick={() => setToggleSidebar(false)}
                      />
                    </div>
                    <div className="font-poppins font-medium text-base text-center mb-4 text-white bg-gray-gradient p-2 rounded-xl">
                      Languages
                    </div>
                    <Languages
                      closeToggle={setToggleSidebar}
                      setLanguageId={setLanguageId}
                    />
                  </div>
                )}
              </div>
            </div>
            <Feed searchTerm={searchTerm} languageId={languageId} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodeSnippets
