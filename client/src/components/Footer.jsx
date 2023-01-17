import styles from "../style";
import { socialMedia } from "../constants";

const Footer = () => (
  <section className={`${styles.flexCenter} py-4 mx-4 flex-col`}>
    <div className='flex justify-between items-center md:flex-row flex-col p-2 px-4 border-t-[1px] border-t-text-gradient  absolute bottom-2 w-[90vw]'>
      <p className='font-poppins font-normal text-center text-[16px] leading-[27px] text-white'>
        Copyright Ⓒ 2022. All Rights Reserved.{" "}
        <span className='text-gradient font-medium text-[18px]'>CodeHub</span>{" "}
        {"</>"} by{" "}
        <span className='text-gradient font-medium text-[18px]'>
          {" "}
          Md Anzar Ahmad
        </span>
      </p>

      <div className='flex flex-row md:mt-0 mt-4'>
        {socialMedia.map((social, index) => (
          <img
            key={social.id}
            src={social.icon}
            alt={social.id}
            className={`w-[21px] h-[21px] object-contain cursor-pointer ${
              index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
            }`}
            onClick={() => window.open(social.link)}
          />
        ))}
      </div>
    </div>
  </section>
);

export default Footer;
