import React from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
  const navigate = useNavigate()

  const { isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return <Spinner />
  }

  if (!isAuthenticated) navigate('/')

  return (
    <div className="bg-primary flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl mb-4 text-gray-500">404</h1>
      <h2 className="text-2xl mb-6 text-gray-300">Page Not Found</h2>
      <p className="mb-8 mx-4 text-center text-gray-400">
        Sorry, the page you are looking for could not be found.
      </p>
      <Link
        to="/"
        className="m-2 text-slate-300 bg-black-gradient border rounded-md px-6 py-3 font-medium text-base
        hover:text-slate-500 focus:outline-none"
      >
        Return to Home
      </Link>
    </div>
  )
}

export default NotFoundPage
