import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Comments = () => {
    const location = useLocation();
    const {post, currentUser} = location.state;
    const [commentId, setCommentsId] = useState('');
    const [comments, setComments] = useState([]);
    const [isToAddComment, setIsToAddComment] = useState(false);
    const [updateComment, setUpdateComment] = useState('');
    const [body, setBody] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
            fetch(`http://localhost:3000/comments?postId=${post.id}`)
                .then(response => response.json())
                .then(json => setComments(json));
    }, []);

    const addNewComment = (postId) => {

        getAndSetNextPostId();
        updateNextPostId();
        // const ID = (comments == undefined || comments == '') ? 1 : parseInt(comments[comments.length - 1].id) + 1;
        const addedComment = { "postId": postId, "id": commentId, "name": name, "email": currentUser.email, "body": body };

        fetch('http://localhost:3000/comments', {
            method: 'POST',
            body: JSON.stringify(addedComment),
          })
            .then(response => response.json())
            .catch(error => console.error('Error:', error));

        setComments(prevComments => [...prevComments, addedComment]);
        setBody('');
        setName('');
        setIsToAddComment(false);
    };

    const deleteComment = (deleteCommentId) => {
        fetch(`http://localhost:3000/comments/${deleteCommentId}`, {
            method: "DELETE",
          })
            .then(response => response.json());

        setComments(prevComments => prevComments.filter(comment => { return comment.id !== deleteCommentId; }));
    };

    const sendToUpdateComment = (commentToUpdate) => {
        let copyUpdate = [];
        comments.map((comment, i) => {
            // postToUpdate.id == post.id ? copyUpdate[post.id] = true : copyUpdate[post.id] = false;
            commentToUpdate.id == comment.id ? copyUpdate[i] = true : copyUpdate[i] = false;
        });
        setUpdateComment(copyUpdate);
    };

    const updateCommentFunc = (updateCommentObj) => {
        // const updatedComment = { "postId": updateCommentObj.postId, "id": updateCommentObj.id, "name": updateCommentObj.name, "email": updateCommentObj.email, "body": body };

        // fetch update comment 
        fetch(`http://localhost:3000/comments/${updateCommentObj.id}`, {
            method: "PATCH",
            body: JSON.stringify({
                "body": body
            })
        })
            .then((response) => response.json());
            const updatedComment=Object.entries(updateCommentObj).map((entry)=>{
                if(entry[0]=="body")
                    entry[1]=body;
            })
        setComments(prevComments => prevComments.map((comment) => {
            return comment.id == updateCommentObj.id ? updatedComment : comment;
        }));
        setBody('');
        setUpdateComment('');
    };

    const cancel = () => {
        setIsToAddComment(false);
        setBody('');
        setName('');
        setUpdateComment(false);
    };

    const getAndSetNextPostId = () => {
        fetch("http://localhost:3000/nextID", {
            method: 'GET'
        })
          .then((response) => response.json())
          .then((json) => {
              console.log(json);
              setCommentsId(json[0].nextCommentsId);
          });
      };
    
      const updateNextPostId = () => {
        fetch("http://localhost:3000/nextID/1", {
                method: "PATCH",
                body: JSON.stringify({
                    "nextCommentId": commentId + 1
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
                .then((response) => response.json())
                .then((json) => console.log(json));
      };

    // https://dev.to/collegewap/react-fetch-example-getpostputdelete-with-api-3l00

    
    return (
        <>
        {(comments != '') &&
            <>
            {comments.map((comment, i) => {
                return (<div key={i}>
                    <p key={i}>id: {comment.id}, name: {comment.name}, email: {comment.email}
                        <br />body: {comment.body}</p>
                    {comment.email == currentUser.email && <>
                        <button onClick={() => deleteComment(comment.id)}>delete comment</button>
                        {updateComment[i] ? <>
                            <input
                                type="text"
                                placeholder="body"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                            />
                            <button onClick={() => { updateCommentFunc(comment); }}>update</button>
                            <button onClick={() => { cancel(); }}>cancel</button>
                        </>
                            : <button onClick={() => sendToUpdateComment(comment)}>update comment</button>
                        }
                    </>}
                </div>);
            })}
            </>
            }
            {isToAddComment ?
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
                    <button onClick={() => { cancel(); }}>cancel</button><br />
                </>
                : <button onClick={() => setIsToAddComment(true)}>add comment</button>
            }
        </>
    );
};
export default Comments;