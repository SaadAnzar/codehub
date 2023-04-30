import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import avatar from '../assets/avatar.svg'
import { client } from '../client'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import { fetchUser } from '../utils/fetchUser'
import { snippetDetailQuery } from '../utils/data'
import Navbar from './Navbar'
import Spinner from './Spinner'
import { v4 as uuidv4 } from 'uuid'
import { useAuth0 } from '@auth0/auth0-react'

const SnippetDetail = () => {
  const navigate = useNavigate()
  const { snippetId } = useParams()
  const [snippetDetail, setSnippetDetail] = useState()
  const [comment, setComment] = useState('')
  const [addingComment, setAddingComment] = useState(false)

  const userInfo = fetchUser()

  const fetchSnippetDetails = () => {
    const query = snippetDetailQuery(snippetId)

    if (query) {
      client.fetch(`${query}`).then((data) => {
        setSnippetDetail(data[0])
      })
    }
  }

  useEffect(() => {
    fetchSnippetDetails()
  }, [snippetId])

  const addComment = () => {
    if (comment) {
      setAddingComment(true)

      client
        .patch(snippetId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [
          {
            comment,
            _key: uuidv4(),
            postedBy: {
              _type: 'postedBy',
              _ref: userInfo?.sub.substring(userInfo?.sub.indexOf('|') + 1),
            },
          },
        ])
        .commit()
        .then(() => {
          fetchSnippetDetails()
          setComment('')
          setAddingComment(false)
        })
    }
  }

  const { isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return <Spinner />
  }

  if (!isAuthenticated) navigate('/')

  if (!snippetDetail) {
    return <Spinner message="Showing Code Snippet" />
  }

  return (
    <>
      {snippetDetail && (
        <div className="bg-primary text-white flex flex-col w-full min-h-screen">
          <Navbar />
          <div className="sm:flex justify-between sm:mx-16 mx-4 my-4 p-2 sm:p-4 bg-gray-gradient rounded-lg">
            <div className="sm:w-[40vw]">
              <div className="App">
                <div className="window sm:h-[70vh]">
                  <div className="title-bar">
                    <div className="p-2 overflow-hidden">
                      <p className="float-left px-4">{snippetDetail?.title}</p>
                      <p className="float-right px-4">
                        {snippetDetail?.language}
                      </p>
                    </div>
                  </div>
                  <div className="editor_wrap">
                    <Editor
                      readOnly={true}
                      value={snippetDetail?.code[0]?.code}
                      onValueChange={(code) => setCode(code)}
                      highlight={(code) => highlight(code, languages.js)}
                      padding={10}
                      style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 12,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="sm:w-[40vw]">
              <div className="">
                <p className="text-2xl font-poppins font-medium pt-2">
                  {snippetDetail?.title}
                </p>
                <p className="font-poppins text-sm p-2">
                  {snippetDetail?.about}
                </p>
              </div>
              <Link
                to={`/user-profile/${snippetDetail?.postedBy._id}`}
                className="flex gap-4 my-3 items-center rounded-lg"
              >
                <img
                  src={snippetDetail?.postedBy.image || avatar}
                  className="w-10 h-10 rounded-full"
                  alt={snippetDetail?.postedBy.userName}
                />
                <p className="font-bold">{snippetDetail?.postedBy.userName}</p>
              </Link>

              <div className="text-xl text-center pb-3 underline">Comments</div>
              <div className="max-h-[40vh] overflow-y-auto bg-gray-gradient rounded-lg">
                {!snippetDetail?.comments?.length && (
                  <div className="text-center px-4">
                    No comments yet. Be the first to comment.
                  </div>
                )}
                {snippetDetail?.comments?.map((item) => (
                  <div className="flex gap-4 pb-4 items-center" key={item._key}>
                    <img
                      src={item.postedBy?.image || avatar}
                      alt={item.postedBy?.nickName}
                      className="w-10 h-10 object-contain mr-2 rounded-full"
                    />
                    <div className="flex flex-col">
                      <p className="font-bold">{item.postedBy?.userName}</p>
                      <p className="text-sm">{item.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex mt-4 gap-4 mr-2">
                <img
                  src={userInfo?.picture || avatar}
                  className="w-10 h-10 rounded-full"
                  alt={userInfo?.name}
                />
                <input
                  className="flex-1 bg-gray-gradient border-gray-300 border-2 p-2 my-2 rounded-2xl focus:border-gray-100"
                  type="text"
                  placeholder="Add a comment"
                  value={comment}
                  onChange={(e) =>
                    setComment(
                      e.target.value.replace(/\b\w/g, (l) => l.toUpperCase())
                    )
                  }
                />
                <button
                  type="button"
                  className="bg-blue-gradient text-black rounded-[20px] px-4 py-2 font-semibold text-base outline-none"
                  onClick={addComment}
                >
                  {addingComment ? 'Adding...' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SnippetDetail
