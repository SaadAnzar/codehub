import React from 'react'
import { programmingLangs } from '../utils/data'
import { NavLink, Link } from 'react-router-dom'
import { IoIosArrowForward } from 'react-icons/io'
import { fetchUser } from '../utils/fetchUser'

const isNotActiveStyle =
  'flex items-center gap-3 my-4 text-gray-400 hover:text-white transition-all duration-200 ease-in-out capitalize'
const isActiveStyle =
  'flex items-center gap-3 my-4 font-extrabold border-r-2 border-white transition-all duration-200 ease-in-out capitalize'

const Languages = () => {
  const User = fetchUser()

  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false)
  }

  return (
    <div className="sm:h-[67vh] h-auto bg-gray-gradient p-2 rounded-xl my-2">
      <ul>
        {programmingLangs
          .slice(0, programmingLangs.length - 1)
          .map((language) => (
            <NavLink
              to={`/codesnippets/language/${language.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
              key={language.name}
            >
              <div className="inline-flex">
                <img
                  src={`${language.icon}`}
                  alt={`${language.name}`}
                  className="w-[28px] h-[28px] object-contain ml-4 mr-8"
                />
                {language.name}
              </div>
            </NavLink>
          ))}
      </ul>
      {User && (
        <Link
          to={`/user-profile/${User.sub.substring(User?.sub.indexOf('|') + 1)}`}
          className="flex mt-8 mb-3 gap-2 p-2 items-center text-dimWhite bg-black-gradient-2 hover:text-white opacity-70 rounded-lg shadow-lg mx-3"
          onClick={handleCloseSidebar}
        >
          <img
            src={User.picture}
            className="w-10 h-10 rounded-full"
            alt="user-profile"
          />
          <p>{User.name}</p>
          <IoIosArrowForward />
        </Link>
      )}
    </div>
  )
}

export default Languages
