import { useEffect, useState } from "react";

const Comments = (props) => {
    const { post, currentUser } = props;
    const [comments, setComments] = useState();
    const [addComment, setAddComment] = useState(false);
    const [updateComment, setUpdateComment] = useState(false);
    const [body, setBody] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
            fetch(`http://localhost:3000/comments?postId=${post.id}`)
                .then(response => response.json())
                .then(json => setComments(json));
    }, [])

    const addNewComment = (postId) => {
        const ID = (comments == undefined || comments == '') ? 1 : parseInt(comments[comments.length - 1].id) + 1;
        const addedComment = { "postId": postId, "id": ID, "name": name, "email": currentUser.email, "body": body };

        //fetch add comment
        fetch('http://localhost:3000/comments', {
            method: 'POST',
            body: JSON.stringify(addedComment),
          })
            .then(response => response.json())
            .catch(error => console.error('Error:', error));

        setComments(prevComments => [...prevComments, addedComment]);
        setBody('');
        setName('');
        setAddComment(false);
    }

    const deleteComment = (deleteCommentId) => {
        // fetch delete comment
        fetch(`http://localhost:3000/comments/${deleteCommentId}`, {
            method: "DELETE",
          })
            .then(response => response.json())

        setComments(prevComments => prevComments.filter(comment => { return comment.id !== deleteCommentId; }));
    }

    const sendToUpdateComment = (commentToUpdate) => {
        let copyUpdate = [];
        comments.map((comment, i) => {
            // postToUpdate.id == post.id ? copyUpdate[post.id] = true : copyUpdate[post.id] = false;
            commentToUpdate.id == comment.id ? copyUpdate[comment.id] = true : copyUpdate[comment.id] = false;
        });
        setUpdateComment(copyUpdate);
        setName(commentToUpdate.name);
    }

    const updateCommentFunc = (commentPostId, UpdateComment) => {
        // fetch update comment 

        fetch(`http://localhost:3000/comments/${UpdateComment.id}`, {
            method: "PUT",
            body: JSON.stringify(updateComment),
          })
            .then(response => response.json())

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
        setAddComment(false);
        setBody('');
        setName('');
        setUpdateComment(false);
    }

    // https://dev.to/collegewap/react-fetch-example-getpostputdelete-with-api-3l00

    
    if (comments == undefined)
        return (
            <></>
        )
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
                                {updateComment[comment.id] ? <>
                                    <input
                                        type="text"
                                        placeholder="body"
                                        value={body}
                                        onChange={(e) => setBody(e.target.value)}
                                    />
                                    <button onClick={() => { updateCommentFunc(post.id, comment) }}>update</button>
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
    )
}
export default Comments;