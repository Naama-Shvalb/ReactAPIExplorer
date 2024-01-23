import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from '../contexts/UserProvider';


const Comments = () => {
    const location = useLocation();
    const { post} = location.state;
    const { user } = useContext(UserContext);
    const [commentId, setCommentId] = useState('');
    const [comments, setComments] = useState([]);
    const [isToAddComment, setIsToAddComment] = useState(false);
    const [updateComment, setUpdateComment] = useState('');
    const [body, setBody] = useState('');
    const [name, setName] = useState('');
    const [toSearchId, setToSearchId] = useState('');
    const [toSearchName, setToSearchName] = useState('');
    const [searchTodosdBy, setSearchTodosBy] = useState('');  

    useEffect(() => {
        fetch(`http://localhost:3000/comments?postId=${post.id}`)
            .then(response => response.json())
            .then(json => setComments(json));
        fetch("http://localhost:3000/nextID", {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((json) => {
                setCommentId(json[0].nextCommentId);
            });
    }, []);

    const addNewComment = async (postId) => {
        updateNextPostId();
        const addedComment = { 
            "postId": postId, 
            "id": `${commentId}`, 
            "name": name, 
            "email": user.email, 
            "body": body 
        };
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
        getAndSetNextPostId();
    };

    const searchComments = (propertytype, property) => {
        if (property === '' || property === undefined) {
          fetch(`http://localhost:3000/comments?postId=${post.id}`)
              .then(response => response.json())
              .then(json => setComments(json));
        } else {
          fetch(`http://localhost:3000/comments?${propertytype}=${property}`)
              .then(response => response.json())
              .then(json => setComments(json));
        }
      };

    const deleteComment = (deleteCommentId) => {
        fetch(`http://localhost:3000/comments/${deleteCommentId}`, {
            method: "DELETE",
        })
            .then(response => response.json());

        setComments(prevComments => prevComments.filter(comment => { return comment.id !== deleteCommentId; }));
    };

    const updateCommentFunc = (updateCommentObj) => {
        console.log(updateCommentObj.id);
        fetch(`http://localhost:3000/comments/${updateCommentObj.id}`, {
            method: "PATCH",
            body: JSON.stringify({
                "body": body,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));

        const updatedComment = {
            "postId": updateCommentObj.postId,
            "id": updateCommentObj.id, 
            "name": updateCommentObj.name, 
            "email": updateCommentObj.email, 
            "body": body };

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
        setUpdateComment('');
    };

    const getAndSetNextPostId = () => {
        fetch("http://localhost:3000/nextID", {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json[0].nextCommentId);
                setCommentId(json[0].nextCommentId);
            });
    };

    const updateNextPostId = () => {
        console.log(commentId);
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

    return (
        <>
        <h4>comments</h4>
        <div>
        <h2>Search Comments</h2>
        {searchTodosdBy ==='id' ?
          <>
          <input
              type="number"
              placeholder="id"
              value={toSearchId}
              onChange={(e) => setToSearchId(e.target.value)}
          />
          <button onClick={() => searchComments(searchTodosdBy, toSearchId)}>search</button>
          <button onClick={() => { cancel(); }}>cancel</button><br />
          </>
          :searchTodosdBy === 'name'?
            <>
            <input
                type="text"
                placeholder="name"
                value={toSearchName}
                onChange={(e) => setToSearchName(e.target.value)}
            />
            <button onClick={() => searchComments(searchTodosdBy, toSearchName)}>search</button>
            <button onClick={() => { cancel(); }}>cancel</button><br />
            </>
            :<>
            <button onClick={()=>setSearchTodosBy('id')}>search by id:</button>
            <button onClick={()=>setSearchTodosBy('name')}>search by name:</button>
            </>
        }
      </div>

            {(comments != '') &&
                <>
                    {comments.map((comment, i) => {
                        return (<div key={i}>
                            <p key={i}>id: {comment.id}, name: {comment.name}, email: {comment.email}
                                <br />body: {comment.body}</p>
                            {comment.email == user.email && <>
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
                                    : <button onClick={() => setUpdateComment(comment.id)}>update comment</button>
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