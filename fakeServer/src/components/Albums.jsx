import { useEffect, useState } from "react";
const Albums = () => {

    const [albums, setAlbums]= useState('');
    const [displayPhotos, setDisplayPhotos]=useState(false);

    const currentUser = JSON.parse(localStorage.getItem("activeUser"));


    useEffect(()=>{
        fetch(`http://localhost:3000/albums?userId=${currentUser.id}`)
        .then(response => response.json())
        .then(json => setAlbums(json))
    }, [])

    const showPhotos = (showAlbumId) => {
        let copyDetail = [];
        albums.map((album, i) => {
            showAlbumId == album.id ? copyDetail[i] = true : copyDetail[i] = false;
        });
        setDisplayPhotos(copyDetail);
    }

    if(albums=='')
        return(
            <></>
        )
    return(
        <>
            <h1>Albums</h1>
            {albums.map((album, index)=>{
                return(
                <div key={index}>
                    <p>id: {album.id}, title: {album.title}</p>
                    {displayPhotos[index]?
                    <>
                    
                    </>
                    // להחליף ללינק 
                    : <button onClick={()=>showPhotos(album.id)}>display photos</button>
                }
                </div>
                )
            }

            )}
        </>
    )
}
export default Albums;