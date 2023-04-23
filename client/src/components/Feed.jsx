import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import Spinner from "./Spinner";
import Snippets from "./Snippets";

const Feed = () => {
  const [snippets, setSnippets] = useState();
  const [loading, setLoading] = useState(false);
  const { languageId } = useParams();

  useEffect(() => {
    if (languageId) {
      setLoading(true);
      const query = searchQuery(languageId);
      client.fetch(query).then((data) => {
        setSnippets(data);
        setLoading(false);
      });
    } else {
      setLoading(true);

      client.fetch(feedQuery).then((data) => {
        setSnippets(data);
        setLoading(false);
      });
    }
  }, [languageId]);

  const ideaName = languageId || "new";

  if (loading) {
    return (
      <Spinner message={`We are fetching ${ideaName} snippets to your feed!`} />
    );
  }
  return (
    <div className='sm:w-[40%] sm:order-1 sm:mx-16'>
      <div className='flex justify-between items-center'>
        <Link to='/codesnippets'>
          <div className='font-poppins font-normal text-base text-center mb-4 text-white bg-gray-gradient hover:bg-gray-600 p-2 px-3 sm:px-6 rounded-lg'>
            Code Snippets
            <span className='bg-discount-gradient px-3 ml-4 py-1 rounded-md'>
              {snippets?.length}
            </span>
          </div>
        </Link>
        <Link to='/codesnippets/create-snippet'>
          <div className='inline-flex gap-1 font-poppins font-normal text-base text-center mb-4 text-white bg-gray-gradient hover:bg-gray-600 p-2 pr-4 rounded-lg'>
            <IoMdAdd
              style={{
                height: "1.5em",
              }}
            />
            Add Snippet
          </div>
        </Link>
      </div>
      {snippets && <Snippets snippets={snippets} />}
    </div>
  );
};

export default Feed;
