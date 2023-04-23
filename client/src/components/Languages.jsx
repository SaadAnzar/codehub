import React from "react";
import { programmingLangs } from "../constants";
import { NavLink, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./Loading";

const isNotActiveStyle =
  "flex items-center gap-3 my-4 text-gray-400 hover:text-white transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex items-center gap-3 my-4 font-extrabold border-r-2 border-white transition-all duration-200 ease-in-out capitalize";

const Languages = () => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to='/' />;
  }

  return (
    <div className='h-auto bg-gray-gradient p-2 rounded-xl mb-4'>
      <ul>
        {programmingLangs.map((langs) => (
          <NavLink
            to={`/codesnippets/language/${langs.id}`}
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
            key={langs.id}
          >
            <div className='inline-flex'>
              <img
                src={`${langs.icon}`}
                alt={`${langs.id}`}
                className='w-[28px] h-[28px] object-contain ml-4 mr-8'
              />
              {langs.title}
            </div>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default Languages;
