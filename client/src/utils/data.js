export const feedQuery = `*[_type == "snippet"] | order(_createdAt desc) {
  _id,
  title,
  code[]{
    _key,
    _type,
    code,
  },
  language,
  postedBy->{
    _id,
    userName,
    nickName,
    image
  },
  save[]{
    _key,
    postedBy->{
      _id,
      userName,
      nickName,
      image
    },
  },
} `;

export const snippetDetailQuery = (snippetId) => {
  const query = `*[_type == "snippet" && _id == '${snippetId}']{
    _id,
    title, 
    language,
    code[]{
      _key,
      _type,
      code,
    },
    postedBy->{
      _id,
      userName,
      nickName,
      image
    },
   save[]{
      postedBy->{
        _id,
        userName,
        nickName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        nickName,
        image
      },
    }
  }`;
  return query;
};

export const searchQuery = (searchTerm) => {
  const query = `*[_type == "snippet" && (lower(title) == '${searchTerm.toLowerCase()}' || lower(language) == '${searchTerm.toLowerCase()}')]{
    _id,
    title,
    code[]{
      _key,
      _type,
      code,
    },
    language,
    postedBy->{
      _id,
      userName,
      nickName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        nickName,
        image
      },
    },
          }`;
  return query;
};

export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == '${userId}']`;
  return query;
};

export const userCreatedPinsQuery = (userId) => {
  const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
    _id,
    title,
    code[]{
      _key,
      _type,
      code,
    },
    language,
    postedBy->{
      _id,
      userName,
      nickName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        nickName,
        image
      },
    },,
  }`;
  return query;
};

export const userSavedPinsQuery = (userId) => {
  const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    _id,
    title,
    code[]{
      _key,
      _type,
      code,
    },
    language,
    postedBy->{
      _id,
      userName,
      nickName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        nickName,
        image
      },
    },
  }`;
  return query;
};
