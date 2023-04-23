import React from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

const NotFoundPage = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to='/' />;
  }

  return (
    <div className='bg-primary flex flex-col items-center justify-center h-screen'>
      <h1 className='text-6xl mb-4 text-gray-500'>404</h1>
      <h2 className='text-2xl mb-6 text-gray-300'>Page Not Found</h2>
      <p className='mb-8 mx-4 text-center text-gray-400'>
        Sorry, the page you are looking for could not be found.
      </p>
      <Link
        to='/'
        className='px-8 py-4 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors duration-300'
      >
        Return to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
