import { useState, useEffect } from 'react';
import Comments from './Comments';
import './posts.css'

const Posts = () => {

  const [posts, setPosts] = useState();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [addPost, setAddPost] = useState(false);
  const [details, setDetail] = useState(false);
  const [updatePost, setUpdatePost] = useState(false);
  const [displayComments, SetDisplayComments] = useState(false);

  const storedUsers = JSON.parse(localStorage.getItem("storedUsers"));
  const currentUser = storedUsers[storedUsers.length - 1];

  useEffect(() => {
      fetch(`http://localhost:3000/posts?userId=${currentUser.id}`)
        .then(response => response.json())
        .then(json => setPosts(json));
  }, []);


  const getMoreDetails = (showPostId) => {
    SetDisplayComments(false);
    let copyDetail = [];
    posts.map((post, i) => {
      showPostId == post.id ? copyDetail[post.id] = true : copyDetail[post.id] = false;
    });
    setDetail(copyDetail);
  }

  const deletePost = (deletePostId) => {
    //fetch- delete post

    setPosts(prevPosts => prevPosts.filter(post => { return post.id !== deletePostId; }));
  }

  const addNewPost = () => {
    const ID = (posts == undefined || posts == '') ? 1 : parseInt(posts[posts.length - 1].id) + 1;
    const addedPost = { "id": ID, "userId": currentUser.id, "title": title, "body": body };
    
    //fetch- add post
    fetch('http://localhost:3000/posts', {
      method: 'POST',
      body: JSON.stringify(addedPost),
    })
      .then(response => response.json())
      .catch(error => console.error('Error:', error));

    setPosts(prevPosts => [...prevPosts, addedPost])
    setBody('');
    setTitle('');
    setAddPost(false);
  }

  const sendToUpdatePost = (postToUpdate) => {
    let copyUpdate = [];
    posts.map((post, i) => {
      // postToUpdate.id == post.id ? copyUpdate[post.id] = true : copyUpdate[post.id] = false;
      postToUpdate.id == post.id ? copyUpdate[post.id] = true : copyUpdate[post.id] = false;
    });
    setUpdatePost(copyUpdate);
    setTitle(postToUpdate.title);
    // setBody(postToUpdate.body);
  }

  const postUpdate = (postToUpdateId) => {
    // fetch- upddate post

    const updatedPost = { "uesrId": currentUser.id, "id": postToUpdateId, "title": title, "body": body }
    setPosts(prevPosts => prevPosts.map((post) => {
      return post.id == postToUpdateId ? updatedPost : post;
    }));
    setBody('');
    setTitle('');
    let copyUpdate = [];
    posts.map((post) => { copyUpdate[post.id] = false; });
    setUpdatePost(copyUpdate);
  }

  const cancel = () => {
    setAddPost(false);
    setUpdatePost(false);
    setTitle('');
    setBody('');
  }

  if (posts == undefined) {
    return <></>;
  }
  return (
    <>
      <h1>Posts</h1>
      {posts.map((post, index) => {
        return (
          <div className={`${details[post.id]}`} key={index}>
            <p>id: {post.id} title: {post.title}</p>
            {details[post.id] ?
              <>
                <p>body: {post.body}</p>
                {updatePost[post.id] ?
                  <>
                    <br />
                    {/* <input
                      type="text"
                      placeholder="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    /> */}
                    <input
                      type="text"
                      placeholder="body"
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                    />
                    <button onClick={() => postUpdate(post.id)}>update</button>
                    <button onClick={() => { cancel() }}>cancel</button><br/>
                  </>
                  : <button onClick={() => sendToUpdatePost(post)}>update post</button>
                }
                <button onClick={() => deletePost(post.id)}>delete post</button>
                {!displayComments ?
                  <button onClick={() => SetDisplayComments(true)} >show all comments</button>
                  : <Comments post={post} currentUser={currentUser}/>
                }
          
              </>
              : <button onClick={() => getMoreDetails(post.id)}>more details</button>}
          </div>
        )
      })}
      {addPost ? <>
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
        <button onClick={() => { cancel() }}>cancel</button>
      </>
        : <button onClick={() => setAddPost(true)}>add post</button>
      }

    </>
  )
}
export default Posts;