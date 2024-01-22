
import { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import './posts.css';

const Posts = () => {

  const [posts, setPosts] = useState();
  const [postId, setPostId] = useState('');
  const [currentPost, setCurrentPost] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isToAddPost, setIsToAddPost] = useState(false);
  const [displayDetails, setDisplayDetails] = useState('');
  const [isToUpdatePost, setIsToUpdatePost] = useState(false);
  const [displayComments, SetDisplayComments] = useState('');

  const currentUser = JSON.parse(localStorage.getItem("activeUser"));

  useEffect(() => {
      fetch(`http://localhost:3000/posts?userId=${currentUser.id}`)
        .then(response => response.json())
        .then(json => setPosts(json));
  }, []);


  const getMoreDetails = (displayedPost) => {
    setCurrentPost(displayedPost);
    SetDisplayComments(false);
    let copyDetail = [];
    posts.map((post, i) => {
      displayedPost.id == post.id ? copyDetail[i] = true : copyDetail[i] = false;
    });
    setDisplayDetails(copyDetail);
  };

  const deletePost = (deletePostId) => {
    //fetch- delete post

    setPosts(prevPosts => prevPosts.filter(post => { return post.id !== deletePostId; }));
  };

  const getAndSetNextPostId = () => {
    fetch("http://localhost:3000/nextID", {
        method: 'GET'
    })
      .then((response) => response.json())
      .then((json) => {
          console.log(json);
          setPostId(json[0].nextPostId);
      });
  };

  const updateNextPostId = () => {
    fetch("http://localhost:3000/nextID/1", {
            method: "PATCH",
            body: JSON.stringify({
                "nextPostId": postId + 1
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
  };

  const addNewPost = () => {
    getAndSetNextPostId();
    updateNextPostId();
    // const ID = (posts == undefined || posts == '') ? 1 : parseInt(posts[posts.length - 1].id) + 1;
    const addedPost = { "id": postId, "userId": currentUser.id, "title": title, "body": body }; 
    fetch('http://localhost:3000/posts', {
      method: 'POST',
      body: JSON.stringify(addedPost),
    })
      .then(response => response.json())
      .catch(error => console.error('Error:', error));

    setPosts(prevPosts => [...prevPosts, addedPost]);
    setBody('');
    setTitle('');
    setIsToAddPost(false);

    
  };

  const postUpdate = (postToUpdate) => {
    const updatedPost = { "uesrId": currentUser.id, "id": postToUpdate.id, "title": postToUpdate.title, "body": body };

    // fetch- upddate post

    setPosts(prevPosts => prevPosts.map((post) => {
      return post.id == postToUpdate.id ? updatedPost : post;
    }));
    setBody('');
    setIsToUpdatePost(false);
  };

  const cancel = () => {
    setIsToAddPost(false);
    setIsToUpdatePost(false);
    setTitle('');
    setBody('');
  };

  if (posts == undefined) {
    return <></>;
  }
  return (
    <>
      <h1>Posts</h1>
      {posts.map((post, index) => (
          <div className={`${displayDetails[post.id]}`} key={index}>
            <p>id: {post.id} title: {post.title}</p>
            {displayDetails[index] ?
              <>
                <p>body: {post.body}</p>
                {isToUpdatePost ?
                  <>
                    <br />
                    <input
                      type="text"
                      placeholder="body"
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                    />
                    <button onClick={() => postUpdate(post)}>update</button>
                    <button onClick={() => { cancel(); }}>cancel</button><br/>
                  </>
                  : <button onClick={() => setIsToUpdatePost(true)}>update post</button>
                }
                <button onClick={() => deletePost(post.id)}>delete post</button>
                {!displayComments ?
                  <button onClick={() => SetDisplayComments(true)} >show all comments</button>
                  // <button onClick={() => {SetDisplayComments(true); return(<Navigate to={"comments"} state={{ currentPost: currentPost, currentUser: currentUser }} />);}}>
                  //   show all comments
                  // </button>

                  : 
                  <><Navigate to={"comments"} state={{currentPost: currentPost , currentUser: currentUser}}/>
                  <Outlet/>
                   </>
                  
                }
          
              </>
              : <button onClick={() => getMoreDetails(post)}>open post</button>}
          </div>
        ))}
      {isToAddPost ? <>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button onClick={addNewPost}>add</button>
        <button onClick={() => { cancel(); }}>cancel</button>
      </>
        : <button onClick={() => setIsToAddPost(true)}>add post</button>
      }

    </>
  );
};
export default Posts;