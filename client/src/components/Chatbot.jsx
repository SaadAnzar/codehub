import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [chats, setChats] = useState([]);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  const handleSubmit = (event) => {
    event.preventDefault();

    setChats([...chats, { message: input, author: "user" }]);

    axios
      .post("https://codehub-8sr2.onrender.com/chat", {
        prompt: input,
      })
      .then((res) => {
        // console.log("ass", res.data.Answer);
        const Answer = res.data.Answer;
        setChats([
          ...chats,
          { message: input, author: "user" },
          { message: Answer, author: "bot" },
        ]);
        setInput("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='mx-2'>
      <div className='bg-gray-gradient rounded-lg z-1 drop-shadow-md w-full'>
        <form onSubmit={handleSubmit} className='my-2'>
          <div className='px-4 py-2 flex items-center'>
            <input
              type='text'
              value={input}
              placeholder='Ask anything about your code...'
              onChange={(event) =>
                setInput(
                  event.target.value.charAt(0).toUpperCase() +
                    event.target.value.slice(1)
                )
              }
              className='bg-inherit border-none outline-none text-white w-full'
            />
            <button type='submit' className='ml-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='bg-gray-700'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5'
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
      <div
        ref={chatContainerRef}
        className='max-h-[64vh] bg-gray-gradient rounded-lg shadow-lg overflow-y-auto scroll-smooth'
      >
        {chats.map((chat, index) => (
          <div
            key={index}
            className={`rounded-lg mx-1.5 my-1.5 ${
              chat.author === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block px-1.5 py-0.5 text-base rounded-lg ${
                chat.author === "user" ? "bg-gray-700" : "bg-[#147efb]"
              }`}
            >
              {chat.message}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Chatbot;
