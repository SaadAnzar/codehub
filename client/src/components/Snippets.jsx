import React from 'react'
import Snippet from './Snippet'

const Snippets = ({ snippets }) => {
  return (
    <div className="sm:h-[63vh] sm:pr-2 h-auto overflow-y-auto my-2">
      {snippets?.length === 0 && (
        <div className="text-center text-dimWhite m-6 py-6 rounded-xl">
          <p className="text-xl">No Code Snippets Found</p>
          <p className="text-lg my-2">Create a new snippet</p>
        </div>
      )}
      <ul>
        {snippets?.map((snippet) => (
          <Snippet key={snippet._id} snippet={snippet} />
        ))}
      </ul>
    </div>
  )
}

export default Snippets
