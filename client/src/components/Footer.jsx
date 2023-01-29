import styles from "../style";
import { socialMedia } from "../constants";

const Footer = () => (
  <footer
    className={`${styles.flexCenter} bg-primary absolute bottom-0 w-full sm:inline-flex hidden`}
  >
    <div className='flex justify-between items-center md:flex-row flex-col px-3 py-2 border-t-[1px] border-t-text-gradient w-[92vw]'>
      <p className='font-poppins font-normal text-center text-[12px] leading-[25px] text-white'>
        Copyright Ⓒ 2022. All Rights Reserved. <br className='sm:hidden' />{" "}
        <span className='sm:inline-block hidden text-gradient font-medium text-[14px]'>
          CodeHub
        </span>{" "}
        <span className='sm:inline-block hidden'>{"</>"} by </span>{" "}
        <span className='sm:inline-block hidden text-gradient font-medium text-[14px]'>
          Md Anzar Ahmad
        </span>
      </p>

      <div className='flex flex-row md:mt-0 mt-2'>
        {socialMedia.map((social, index) => (
          <img
            key={social.id}
            src={social.icon}
            alt={social.id}
            className={`w-[16px] h-[16px] object-contain cursor-pointer ${
              index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
            }`}
            onClick={() => window.open(social.link)}
          />
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
