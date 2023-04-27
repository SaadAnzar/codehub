import cpp from "../assets/cpp.svg";
import python from "../assets/python.svg";
import javascript from "../assets/javascript.svg";
import haskell from "../assets/haskell.svg";
import java from "../assets/java.svg";
import csharp from "../assets/csharp.svg";
import html from "../assets/html.svg";
import css from "../assets/css.svg";

export const programmingLangs = [
  {
    name: "C++",
    icon: cpp,
  },
  {
    name: "Python",
    icon: python,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "Haskell",
    icon: haskell,
  },
  {
    name: "Java",
    icon: java,
  },
  {
    name: "C#",
    icon: csharp,
  },
  {
    name: "HTML",
    icon: html,
  },
  {
    name: "CSS",
    icon: css,
  },
  {
    name: "Others",
    icon: "https://i.pinimg.com/236x/2e/63/c8/2e63c82dfd49aca8dccf9de3f57e8588.jpg",
  },
];

export const feedQuery = `*[_type == "snippet"] | order(_createdAt desc) {
  _id,
  title,
  language,
  about,
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
    about,
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
    language,
    about,
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

export const userCreatedSnippetsQuery = (userId) => {
  const query = `*[ _type == 'snippet' && userId == '${userId}'] | order(_createdAt desc){
    _id,
    title,
    language,
    about,
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

export const userSavedSnippetsQuery = (userId) => {
  const query = `*[_type == 'snippet' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    _id,
    title,
    language,
    about,
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
