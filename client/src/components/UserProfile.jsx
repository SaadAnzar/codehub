import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import {
  userQuery,
  userCreatedSnippetsQuery,
  userSavedSnippetsQuery,
} from "../utils/data";
import { client } from "../client";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./Navbar";
import Spinner from "./Spinner";
import Loading from "./Loading";
import Snippets from "./Snippets";
import Footer from "./Footer";

const activeBtnStyles =
  "bg-blue-gradient mx-2 text-black font-bold p-2 rounded-full w-20 outline-none";
const notActiveBtnStyles =
  "bg-white mx-2 text-gray-600 font-bold p-2 rounded-full w-20 outline-none";

const UserProfile = () => {
  const [user, setUser] = useState();
  const [snippets, setSnippets] = useState();
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("created");
  const { userId } = useParams();

  useEffect(() => {
    const query = userQuery(userId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  useEffect(() => {
    if (text === "Created") {
      const createdSnippetsQuery = userCreatedSnippetsQuery(userId);

      client.fetch(createdSnippetsQuery).then((data) => {
        setSnippets(data);
      });
    } else {
      const savedSnippetsQuery = userSavedSnippetsQuery(userId);

      client.fetch(savedSnippetsQuery).then((data) => {
        setSnippets(data);
      });
    }
  }, [text, userId]);

  if (!user) return <Spinner message='Loading profile...' />;

  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to='/' />;
  }

  return (
    <div className='bg-primary text-white flex flex-col w-full min-h-screen'>
      <Navbar />
      <div className='mx-6 sm:mx-20 my-4'>
        <div className='relative pb-2 h-full justify-center items-center'>
          <div className='text-center mb-7'>
            <button
              type='button'
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("created");
              }}
              className={`${
                activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Created
            </button>
            <button
              type='button'
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("saved");
              }}
              className={`${
                activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Saved
            </button>
          </div>
          {snippets?.length ? (
            <div className='sm:mx-72'>
              <Snippets snippets={snippets} />
            </div>
          ) : (
            <div className='flex justify-center font-bold text-dimWhite items-center text-2xl mt-4'>
              No Snippets Found!
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;