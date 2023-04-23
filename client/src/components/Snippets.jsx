import React from "react";
import Snippet from "./Snippet";

const Snippets = ({ snippets }) => {
  return (
    <div className='sm:h-[70vh] sm:pr-2 h-auto overflow-y-auto'>
      {snippets?.length === 0 && (
        <div className='text-center text-red-500 bg-gray-gradient m-8 p-8 rounded-xl'>
          <p className='text-2xl'>No snippets found</p>
          <p className='text-xl'>Create a new snippet</p>
        </div>
      )}
      <ul>
        {snippets?.map((snippet) => (
          <Snippet key={snippet._id} snippet={snippet} />
        ))}
      </ul>
    </div>
  );
};

export default Snippets;
