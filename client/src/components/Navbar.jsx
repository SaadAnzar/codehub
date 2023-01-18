import { useState } from "react";
import { Link } from "react-router-dom";
import close from "../assets/close.svg";
import menu from "../assets/menu.svg";
import { navLinks } from "../constants";

const Navbar = () => {
  const [active, setActive] = useState("Auto Code");
  const [toggle, setToggle] = useState(false);

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
            className={`font-poppins font-medium cursor-pointer text-[16px] hover:text-gray-500 ${
              active === nav.title ? "text-white" : "text-dimWhite"
            } ${
              nav.title === navLinks[navLinks.length - 1].title
                ? "mr-0"
                : "mr-10"
            }`}
            onClick={() => setActive(nav.title)}
          >
            <Link to={`/${nav.id}`}>{nav.title}</Link>
          </li>
        ))}
      </ul>

      <div className='sm:hidden flex flex-1 justify-end items-center'>
        <img
          src={toggle ? close : menu}
          alt='menu'
          className='w-[28px] h-[28px] object-contain'
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className='list-none flex justify-end items-start flex-1 flex-col'>
            {navLinks.map((nav) => (
              <li
                key={nav.title}
                className={`font-poppins font-medium cursor-pointer text-[16px] hover:text-gray-500 ${
                  active === nav.title ? "text-white" : "text-dimWhite"
                } ${
                  nav.title === navLinks[navLinks.length - 1].title
                    ? "mb-0"
                    : "mb-4"
                }`}
                onClick={() => setActive(nav.title)}
              >
                <Link to={`/${nav.id}`}>{nav.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
