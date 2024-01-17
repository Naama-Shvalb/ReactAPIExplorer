import { useEffect } from "react";
const Albums = () => {

    useEffect(()=>{
        fetch(`http://localhost:3000/comments?postId=${post.id}`)
        .then(response => response.json())
        .then(json => setComments(json));
    })

    return(
        <>
            <h1>Albums</h1>

        </>
    )
}
export default Albums;