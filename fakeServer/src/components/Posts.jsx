import { useState, useEffect, useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserProvider';
import '../styles/Global.css';
import '../styles/Posts.css';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isToAddPost, setIsToAddPost] = useState(false);
  const [displayDetails, setDisplayDetails] = useState('');
  const [isToUpdatePost, setIsToUpdatePost] = useState(false);
  const [displayComments, SetDisplayComments] = useState('');
  const [toSearchId, setToSearchId] = useState('');
  const [toSearchTitle, setToSearchTitle] = useState('');
  const [searchPostsdBy, setSearchPostsBy] = useState('');
  const [displayClass, setDisplayclass] = useState([]);

  const { user } = useContext(UserContext);

  useEffect(() => {
    fetch(`http://localhost:3000/posts?userId=${user.id}`)
      .then(response => response.json())
      .then(json => setPosts(json));
    fetch("http://localhost:3000/nextID", {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((json) => {
        setPostId(json[0].nextPostId);
      });
  }, []);


  const getMoreDetails = (displayedPost) => {
    SetDisplayComments(false);
    let copyDisplayclass=[];
    posts.map((post,i)=>{copyDisplayclass[i] = post.id==displayedPost.id?"display":"false"})
    setDisplayclass(copyDisplayclass);
    setDisplayDetails(displayedPost.id);
  };

  const searchPosts = (propertytype, property) => {
    if (property === '' || property === undefined) {
      fetch(`http://localhost:3000/posts?userId=${user.id}`)
        .then(response => response.json())
        .then(json => setPosts(json))
        .then(setSearchPostsBy('finished'));
    } else {
      fetch(`http://localhost:3000/posts?${propertytype}=${property}`)
        .then(response => response.json())
        .then(json => setPosts(json))
        .then(setSearchPostsBy('finished'));
    }
  };

  const deletePost = (deletePostId) => {
    fetch(`http://localhost:3000/posts/${deletePostId}`, {
      method: "DELETE",
    })
      .then(response => response.json())
      .catch(error => console.error('Error:', error));


    setPosts(prevPosts => prevPosts.filter(post => { return post.id !== deletePostId; }));
  };

  const getAndSetNextPostId = () => {
    fetch("http://localhost:3000/nextID", {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((json) => {
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
  };

  const addNewPost = () => {
    updateNextPostId();
    const addedPost = {
      "id": `${postId}`,
      "userId": `${user.id}`,
      "title": title,
      "body": body
    };
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
    getAndSetNextPostId();
  };

  const updatePost = (postToUpdateObj) => {
    if(body=='')
      setBody(postToUpdateObj.body);
    if(title=='')
      setTitle(postToUpdateObj.title);
    const updatedPost = {
      "uesrId" : user.id,
      "id":`${postToUpdateObj.id}`,
      "title": title,
      "body": body
    };

    fetch(`http://localhost:3000/posts/${postToUpdateObj.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        "body":body,
        "title":title,
      }),      
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
  })
      .then((response) => response.json())

    setPosts(prevPosts => prevPosts.map((post) => {
      return post.id == postToUpdateObj.id ? updatedPost : post;
    }));
    setBody('');
    setIsToUpdatePost(false);
  };

  const cancel = () => {
    setIsToAddPost(false);
    setIsToUpdatePost(false);
    setSearchPostsBy('');
    setToSearchId('');
    setTitle('');
    setBody('');
    setToSearchId('');
  };


  const cancelSearch = () => {
    setSearchPostsBy('');
    setToSearchId('');
    setTitle('');
    setToSearchId('');
    fetch(`http://localhost:3000/posts?userId=${user.id}`)
      .then(response => response.json())
      .then(json => setPosts(json));
  };

  return (
    <>
      <div className="container">
        <h1 className="heading">Posts</h1>
        <div className="section search-section">
          <h2>Search Posts</h2>
          {searchPostsdBy === 'id' ?
            <>
              <input
                type="number"
                placeholder="id"
                value={toSearchId}
                onChange={(e) => setToSearchId(e.target.value)}
              />
              <button onClick={() => searchPosts(searchPostsdBy, toSearchId)}>search</button>
              <button onClick={() => { cancel(); }}>cancel</button><br />
            </>
            : searchPostsdBy === 'title' ?
              <>
                <input
                  type="text"
                  placeholder="title"
                  value={toSearchTitle}
                  onChange={(e) => setToSearchTitle(e.target.value)}
                />
                <button onClick={() => searchPosts(searchPostsdBy, toSearchTitle)}>search</button>
                <button onClick={() => { cancel(); }}>cancel</button><br />
              </>
              : searchPostsdBy === 'finished' ?
                <>
                  <button onClick={() => { cancelSearch(); }}>cancel search</button><br />
                </>
                : <>
                  <button onClick={() => setSearchPostsBy('id')}>search by id:</button>
                  <button onClick={() => setSearchPostsBy('title')}>search by title:</button>
                </>
          }
        </div>
        {posts.map((post, index) => (
          <div className={`${displayClass[index]}`} key={index}>
            <div className="item-content">
              <p><strong>id:</strong> {post.id} <strong>title:</strong> {post.title}</p>
            </div>
            {displayDetails == post.id ?
              <>
                <p className="item-content">body: {post.body}</p>
                <div className="actions item-actions">
                  {isToUpdatePost ?
                    <>
                      <br />
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
                      <button onClick={() => updatePost(post)}>update</button>
                      <button onClick={() => cancel()}>cancel</button><br />
                    </>
                    : <button onClick={() => setIsToUpdatePost(true)}>update post</button>
                  }
                  <button onClick={() => deletePost(post.id)}>delete post</button>
                </div>
                {!displayComments ?
                  <button onClick={() => SetDisplayComments(true)} >show all comments</button>
                  :
                  <><Navigate to={`${post.id}/comments`} state={{ post: post }} />
                    <Outlet />
                  </>
                }
              </>
              : <button onClick={() => getMoreDetails(post)}>open post</button>
            }
          </div>
        ))}
        <div className="section add-section">
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
        </div>
      </div>
    </>
  );
};
export default Posts;