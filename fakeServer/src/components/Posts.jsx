import React, { useState, useEffect } from 'react';
const Posts = () => {

  const [posts, setPosts] = useState('');
  // const [show, setShow] = useState(false);

  const storedUsers = JSON.parse(localStorage.getItem("storedUsers"));
  const currentUser = storedUsers[storedUsers.length - 1];

  useEffect(() => {
    fetch(`http://localhost:3000/posts?userId=${currentUser.id}`)
      .then(response => response.json())
      .then(json => setPosts(json));
  });

  let copyPost;
  const getMoreDetails = (showPostId) => {
    copyPost=posts;
    copyPost.map((post) => {
      showPostId==post.id?post.show=true : post.show = false;
    })
  }

  if (posts === '') {
    return <></>;
  }
  return (
    <>
      <h1>Posts</h1>
      {posts.map((post, index) => {
        return (
          <div key={index}>
            <p>
              id: {post.id} title: {post.title}
              <button onClick={() => getMoreDetails(post.id)}>more details</button>
            </p>
            {/* {copyPost[index].show?<p>body: {post.body}</p>:<></>} */}
          </div>
        )
      })}
      <button></button>
    </>
  )
}
export default Posts;