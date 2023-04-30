import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { IoMdAdd } from 'react-icons/io'
import { client } from '../client'
import { feedQuery, searchQuery } from '../utils/data'
import Spinner from './Spinner'
import Snippets from './Snippets'

const Feed = ({ searchTerm, setSearchTerm }) => {
  const [snippets, setSnippets] = useState()
  const [loading, setLoading] = useState(false)
  const { languageId } = useParams()

  useEffect(() => {
    if (languageId) {
      setLoading(true)
      const query = searchQuery(languageId)
      client.fetch(query).then((data) => {
        setSnippets(data)
        setLoading(false)
      })
    } else if (searchTerm !== '') {
      setLoading(true)
      const query = searchQuery(searchTerm.toLowerCase())
      client.fetch(query).then((data) => {
        setSnippets(data)
        setLoading(false)
      })
    } else {
      setLoading(true)

      client.fetch(feedQuery).then((data) => {
        setSnippets(data)
        setLoading(false)
      })
    }
  }, [languageId, searchTerm])

  const ideaName = languageId || 'Code'

  return (
    <div className="sm:w-[60%] sm:order-1">
      <div className="flex justify-between items-center">
        <Link to="/codesnippets">
          <div className="font-poppins font-normal text-base text-center mb-4 text-white bg-gray-gradient hover:bg-gray-600 p-2 px-3 sm:px-6 rounded-lg">
            Code Snippets
          </div>
        </Link>
        <Link to="/codesnippets/create-snippet">
          <div className="inline-flex gap-1 font-poppins font-normal text-base text-center mb-4 text-white bg-gray-gradient hover:bg-gray-600 p-2 pr-4 rounded-lg">
            <IoMdAdd
              style={{
                height: '1.5em',
              }}
            />
            Add Snippet
          </div>
        </Link>
      </div>
      {loading && (
        <Spinner
          message={`We are fetching ${ideaName} snippets to your feed!`}
        />
      )}

      <span className="text-gray-400 text-sm p-4">
        {snippets?.length} {ideaName} Snippets available
      </span>
      {snippets && <Snippets snippets={snippets} />}
    </div>
  )
}

export default Feed
