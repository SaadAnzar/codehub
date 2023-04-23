import React from "react";
import { useNavigate } from "react-router-dom";
import { AiFillStar, AiOutlineStar, AiTwotoneDelete } from "react-icons/ai";
import avatar from "../assets/avatar.svg";
import { client } from "../client";
import { fetchUser } from "../utils/fetchUser";
import { v4 as uuidv4 } from "uuid";

const Snippet = ({ snippet }) => {
  const navigate = useNavigate();

  const { _id, postedBy, title, language } = snippet;

  const userInfo = fetchUser();

  const deleteSnippet = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };

  let alreadySaved = snippet?.save?.filter(
    (item) =>
      item?.postedBy?._id ===
      userInfo?.sub.substring(userInfo?.sub.indexOf("|") + 1)
  );

  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

  const saveSnippet = (id) => {
    if (alreadySaved?.length === 0) {
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: userInfo?.sub.substring(userInfo?.sub.indexOf("|") + 1),
            postedBy: {
              _type: "postedBy",
              _ref: userInfo?.sub.substring(userInfo?.sub.indexOf("|") + 1),
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
        });
    }
  };

  return (
    <li
      key={_id}
      onClick={() => navigate(`/codesnippets/snippet-detail/${_id}`)}
    >
      <div className='bg-gray-gradient p-3 mb-2 rounded-lg cursor-pointer'>
        <div className='inline-flex font-[300] text-gray-400 font-poppins'>
          <img
            src={postedBy?.image || avatar}
            alt='avatar'
            className='w-[28px] h-[28px] object-contain mr-2 rounded'
          />
          @{postedBy?.nickName}
        </div>
        <div className='float-right'>
          {postedBy?._id ===
            userInfo?.sub.substring(userInfo?.sub.indexOf("|") + 1) && (
            <button
              type='button'
              className='bg-slate-800 p-2 rounded-xl w-8 h-8 flex items-center justify-center text-red-500 opacity-75 hover:opacity-100 outline-none text-left'
              onClick={(e) => {
                e.stopPropagation();
                deleteSnippet(_id);
              }}
            >
              <AiTwotoneDelete />
            </button>
          )}
        </div>
        <div className='py-4 font-normal'>{title}</div>
        <hr></hr>
        <div className='pt-3 overflow-hidden'>
          <div className='bg-discount-gradient px-4 py-1 rounded-md float-left'>
            {language}
          </div>
          <div className='float-right inline-flex'>
            {snippet?.save?.length > 0 && (
              <span className='bg-discount-gradient px-3 mx-2 py-1 rounded-md'>
                {snippet?.save?.length}
              </span>
            )}
            {alreadySaved?.length !== 0 ? (
              <button type='button' className='py-[6px]'>
                <AiFillStar color='yellow' />
              </button>
            ) : (
              <button
                type='button'
                className='py-[6px]'
                onClick={(e) => {
                  e.stopPropagation();
                  saveSnippet(_id);
                }}
              >
                <AiOutlineStar />
              </button>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default Snippet;
