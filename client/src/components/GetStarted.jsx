import styles from "../style";
import arrowUp from "../assets/arrow-up.svg";
import { useAuth0 } from "@auth0/auth0-react";

const GetStarted = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div
      className={`${styles.flexCenter} w-[110px] h-[110px] rounded-full bg-blue-gradient p-[3px] cursor-pointer`}
    >
      {isAuthenticated ? (
        <div
          className={`${styles.flexCenter} flex-col bg-primary hover:opacity-90 w-[100%] h-[100%] rounded-full`}
        >
          <div className={`${styles.flexStart} flex-row`}>
            <p className='font-poppins font-medium text-[18px] leading-[23.4px]'>
              <span className='text-gradient'>Let's</span>
            </p>
          </div>

          <p className='font-poppins font-medium text-[18px] leading-[23.4px]'>
            <span className='text-gradient'>Continue</span>
          </p>
        </div>
      ) : (
        <div
          className={`${styles.flexCenter} flex-col bg-primary hover:opacity-90 w-[100%] h-[100%] rounded-full`}
        >
          <div className={`${styles.flexStart} flex-row`}>
            <p className='font-poppins font-medium text-[18px] leading-[23.4px]'>
              <span className='text-gradient'>Get</span>
            </p>
            <img
              src={arrowUp}
              alt='arrow-up'
              className='w-[23px] h-[23px] object-contain'
            />
          </div>

          <p className='font-poppins font-medium text-[18px] leading-[23.4px]'>
            <span className='text-gradient'>Started</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default GetStarted;
