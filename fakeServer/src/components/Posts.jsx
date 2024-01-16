import { useState, useEffect } from 'react';
import './posts.css'

const Posts = () => {

  const [posts, setPosts] = useState();
  const [comments, setComments] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [name, setName] = useState('');
  const [addComment, setAddComment] = useState(false);
  const [addPost, setAddPost] = useState(false);
  const [details, setDetail] = useState(false);
  const [updatePost, setUpdatePost] = useState(false);
  const [displayComments, SetDisplayComments] = useState(false);
  const [updateComment, setUpdateComment] = useState(false);

  const storedUsers = JSON.parse(localStorage.getItem("storedUsers"));
  const currentUser = storedUsers[storedUsers.length - 1];

  useEffect(() => {
    if (posts == undefined) {
      fetch(`http://localhost:3000/posts?userId=${currentUser.id}`)
        .then(response => response.json())
        .then(json => setPosts(json));
    }
    // if(idPost!='')
    // fetch(`http://localhost:3000/comments?postId=${idPost}`)
    //   .then(response => response.json())
    //   .then(json => {setComments(json); SetDisplayComments(true); setIdPost(''); console.log(comments);});
  });


  const getMoreDetails = (showPostId) => {
    SetDisplayComments(false);
    let copyDetail = [];
    posts.map((post, i) => {
      showPostId == post.id ? copyDetail[post.id] = true : copyDetail[post.id] = false;
    });
    setDetail(copyDetail);
  }

  const showComments = (postIdOfToShowComment) => {
    setComments('');
    fetch(`http://localhost:3000/comments?postId=${postIdOfToShowComment}`)
      .then(response => response.json())
      .then(json => { setComments(json); SetDisplayComments(true); console.log(comments); });
    SetDisplayComments(true);
  }

  const deletePost = (deletePostId) => {
    //fetch- delete post

    setPosts(prevPosts => prevPosts.filter(post => { return post.id !== deletePostId; }));
  }

  const addNewPost = () => {
    //fetch- add post

    const ID = (posts == undefined || posts == '') ? 1 : parseInt(posts[posts.length - 1].id) + 1;
    setPosts(prevPosts => [...prevPosts, {
      "userId": currentUser.id,
      "id": ID,
      "title": title,
      "body": body
    }])
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

  const addNewComment = (postId) => {
    //fetch add comment

    const ID = (comments == undefined || comments == '') ? 1
      : parseInt(comments[comments.length - 1].id) + 1;
    setComments(prevComments => [...prevComments, {
      "postId": postId,
      "id": ID,
      "name": name,
      "email": currentUser.email,
      "body": body
    }])
    setBody('');
    setName('');
    setAddComment(false);
  }

  const deleteComment = (deleteCommentId) => {
    // fetch delete comment

    setComments(prevComments => prevComments.filter(comment => { return comment.id !== deleteCommentId; }));
  }

  const sendToUpdateComment = (commentToUpdate) => {
    let copyUpdate = [];
    posts.map((comment, i) => {
      // postToUpdate.id == post.id ? copyUpdate[post.id] = true : copyUpdate[post.id] = false;
      commentToUpdate.id == comment.id ? copyUpdate[comment.id] = true : copyUpdate[comment.id] = false;
    });
    setUpdateComment(copyUpdate);
    setName(commentToUpdate.name);
  }

  const updateCommentFunc = (commentPostId, UpdateCommentId) => {
    // fetch update comment 

    const updatedComment = { "postId": commentPostId, "id": UpdateCommentId, "name": name, "email": currentUser.email, "body": body }
    setComments(prevComments => prevComments.map((comment) => {
      return comment.id == UpdateCommentId ? updatedComment : comment;
    }));
    setBody('');
    setName('');
    let copyUpdate = [];
    comments.map((comment) => { copyUpdate[comment.id] = false; });
    setUpdateComment(copyUpdate);
  }

  const cancel = () => {
    setAddPost(false);
    setUpdatePost(false);
    setUpdateComment(false);
    setAddComment(false);
    setTitle('');
    setName('');
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
                {!displayComments ?
                  <button onClick={() => showComments(post.id)} >show all comments</button>
                  : <>
                    {(comments != '') &&
                      <>
                        {comments.map((comment, i) => {
                          return (<div key={i}>
                            <p key={i}>id: {comment.id}, name: {comment.name}, email: {comment.email}
                              <br />body: {comment.body}</p>
                            {comment.email == currentUser.email && <>
                              <button onClick={() => deleteComment(comment.id)}>delete comment</button>
                              {updateComment[comment.id] ? <>
                                <input
                                  type="text"
                                  placeholder="body"
                                  value={body}
                                  onChange={(e) => setBody(e.target.value)}
                                />
                                <button onClick={() => { updateCommentFunc(post.id, comment.id) }}>update</button>
                                <button onClick={() => { cancel() }}>cancel</button>
                              </>
                                : <button onClick={() => sendToUpdateComment(comment)}>update comment</button>
                              }
                            </>}
                          </div>)
                        })}
                      </>
                    }
                    {addComment ?
                      <>
                        <input
                          type="text"
                          placeholder="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <input
                          type="text"
                          placeholder="body"
                          value={body}
                          onChange={(e) => setBody(e.target.value)}
                        />
                        <button onClick={() => addNewComment(post.id)}>add</button>
                        <button onClick={() => { cancel() }}>cancel</button><br />
                      </>
                      : <button onClick={() => setAddComment(true)}>add comment</button>
                    }
                  </>
                }
                <button onClick={() => deletePost(post.id)}>delete post</button>
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
                    <button onClick={() => { cancel() }}>cancel</button>
                  </>
                  : <button onClick={() => sendToUpdatePost(post)}>update post</button>
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