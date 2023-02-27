import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import close from "../assets/close.svg";
import menu from "../assets/menu.svg";
import { navLinks } from "../constants";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const [active, setActive] = useState("Auto Code");
  const [toggle, setToggle] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const activeLink = navLinks.find(
      (nav) => nav.id === location.pathname.substring(1)
    );
    setActive(activeLink ? activeLink.title : "Auto Code");
  }, [location]);

  const { user, isAuthenticated, logout } = useAuth0();

  return (
    <nav className='bg-primary w-full flex py-4 justify-between items-center navbar px-8'>
      <Link to='/'>
        <span className='font-poppins font-[700] cursor-pointer text-[20px] text-gradient'>
          CodeHub {"{}"}
        </span>
      </Link>

      <ul className='list-none sm:flex hidden justify-end items-center flex-1'>
        {navLinks.map((nav) => (
          <li
            key={nav.title}
            className={`font-poppins font-medium cursor-pointer text-[16px] mr-10 hover:text-gray-500 ${
              active === nav.title ? "text-white" : "text-dimWhite"
            }`}
            onClick={() => setActive(nav.title)}
          >
            <Link to={`/${nav.id}`}>{nav.title}</Link>
          </li>
        ))}
        {isAuthenticated && (
          <li className='font-poppins font-bold text-[16px] text-gradient'>
            <img
              className='h-6 w-6 object-contain rounded'
              src={user.picture}
              alt={user.name}
            />
          </li>
        )}
        <div>
          <button onClick={() => setToggle(!toggle)}>
            {toggle ? (
              <svg
                className='mx-1 h-5 w-6 transform rotate-180'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
                  clipRule='evenodd'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='mx-1 h-6 w-6 inline-block'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
                  clipRule='evenodd'
                />
              </svg>
            )}
          </button>
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar z-20`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col'>
              <li className='font-poppins font-medium mb-4'>
                <span className=' text-[15px] text-dimWhite'>Signed in as</span>
                <br />
                {isAuthenticated && (
                  <span className='text-[16px] text-gradient'>
                    {user.email}
                  </span>
                )}
              </li>
              <hr className='border-b-[0.75px] w-full mb-4 text-white'></hr>
              <li>
                <button
                  className='font-poppins font-medium cursor-pointer text-[16px] hover:text-gray-500'
                  onClick={() => {
                    localStorage.removeItem("chats");
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    });
                  }}
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </ul>

      {/* Mobile View */}
      <div className='sm:hidden flex flex-1 justify-end items-center'>
        {isAuthenticated && (
          <div>
            <img
              className='h-[25px] w-[25px] object-contain rounded mr-4'
              src={user.picture}
              alt={user.name}
            />
          </div>
        )}
        <img
          src={toggle ? close : menu}
          alt='menu'
          className='w-[23px] h-[23px] object-contain cursor-pointer'
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar z-20`}
        >
          <ul className='list-none flex justify-end items-start flex-1 flex-col'>
            <li className='font-poppins font-medium mb-4'>
              <span className=' text-[15px] text-dimWhite'>Signed in as</span>
              <br />
              {isAuthenticated && (
                <span className='text-[16px] text-gradient'>{user.email}</span>
              )}
            </li>
            <hr className='border-b-[0.75px] w-full mb-4 text-white'></hr>
            {navLinks.map((nav) => (
              <li
                key={nav.title}
                className={`font-poppins font-medium cursor-pointer text-[16px] mb-4 hover:text-gray-500 ${
                  active === nav.title ? "text-white" : "text-dimWhite"
                }`}
                onClick={() => setActive(nav.title)}
              >
                <Link to={`/${nav.id}`}>{nav.title}</Link>
              </li>
            ))}
            <li>
              <button
                className='font-poppins font-medium cursor-pointer text-[16px] px-4 py-2 rounded hover:text-gray-500 bg-black-gradient-2'
                onClick={() => {
                  localStorage.removeItem("chats");
                  logout({
                    logoutParams: { returnTo: window.location.origin },
                  });
                }}
              >
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
