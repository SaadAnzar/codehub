import React from "react";
import Loader from "react-loader-spinner";

function Spinner({ message }) {
  return (
    <div className='bg-primary h-[100vh]'>
      <div className='flex flex-col justify-center items-center'>
        <Loader
          type='Circles'
          color='#00BFFF'
          height={50}
          width={200}
          className='mt-20 mb-4'
        />

        <p className='text-lg text-center text-white p-2'>{message}</p>
      </div>
    </div>
  );
}

export default Spinner;
