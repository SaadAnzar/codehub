import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  userQuery,
  userCreatedSnippetsQuery,
  userSavedSnippetsQuery,
} from '../utils/data'
import { client } from '../client'
import avatar from '../assets/avatar.svg'
import { useAuth0 } from '@auth0/auth0-react'
import Navbar from './Navbar'
import Spinner from './Spinner'
import Snippets from './Snippets'

const activeBtnStyles =
  'bg-blue-gradient mx-2 text-black font-bold p-1 rounded-full w-20 outline-none'
const notActiveBtnStyles =
  'bg-white mx-2 text-gray-600 font-bold p-1 rounded-full w-20 outline-none'

const UserProfile = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [user, setUser] = useState()
  const [snippets, setSnippets] = useState()
  const [text, setText] = useState('Created')
  const [activeBtn, setActiveBtn] = useState('created')

  const navigate = useNavigate()

  const { userId } = useParams()

  const { isAuthenticated, isLoading } = useAuth0()

  useEffect(() => {
    const query = userQuery(userId)
    client.fetch(query).then((data) => {
      setUser(data[0])
    })
  }, [userId])

  useEffect(() => {
    if (text === 'Created') {
      const createdSnippetsQuery = userCreatedSnippetsQuery(userId)

      client.fetch(createdSnippetsQuery).then((data) => {
        setSnippets(data)
      })
    } else {
      const savedSnippetsQuery = userSavedSnippetsQuery(userId)

      client.fetch(savedSnippetsQuery).then((data) => {
        setSnippets(data)
      })
    }
  }, [text, userId])

  if (isLoading) {
    return <Spinner />
  }

  if (!isAuthenticated) navigate('/')

  if (!user) return <Spinner message="Loading profile..." />

  return (
    <div className="bg-primary text-white flex flex-col w-full min-h-screen">
      <Navbar />
      <div className="mx-6 sm:mx-20 mt-2">
        <div className="flex gap-4 justify-center items-center rounded-lg">
          <img
            src={user?.image || avatar}
            className="w-8 h-8 rounded-full"
            alt={user?.userName}
          />
          <p className="font-bold">{user?.userName}</p>
        </div>
        <div className="text-center my-4">
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent)
              setActiveBtn('created')
            }}
            className={`${
              activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles
            }`}
          >
            Created
          </button>
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent)
              setActiveBtn('saved')
            }}
            className={`${
              activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles
            }`}
          >
            Saved
          </button>
        </div>
        {snippets?.length ? (
          <div className="sm:mx-72">
            <Snippets snippets={snippets} />
          </div>
        ) : (
          <div className="flex justify-center font-bold text-dimWhite items-center text-2xl mt-4">
            No Snippets Found!
          </div>
        )}
      </div>
    </div>
  )
}

export default UserProfile
