import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Photos from './Photos';
const Albums = () => {

    const [albums, setAlbums] = useState('');
    const [displayPhotos, setDisplayPhotos] = useState('');

    const currentUser = JSON.parse(localStorage.getItem("activeUser"));
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/albums?userId=${currentUser.id}`)
            .then(response => response.json())
            .then(json => setAlbums(json))
    }, [])

    // const showPhotos = (showAlbumId) => {
    //     let copyDetail = [];
    //     albums.map((album, i) => {
    //         showAlbumId == album.id ? copyDetail[i] = true : copyDetail[i] = false;
    //     });
    //     setDisplayPhotos(showAlbumId);
    // }

    const displayPhotosFunc = (albumToDispayPbj) => {
        navigate(`${albumToDispayPbj}/photos`, { state: { album: albumToDispayPbj } });
    }

    if (albums == '')
        return (
            <></>
        )
    return (
        <>
            <h1>Albums</h1>
            <label></label>
            {albums.map((album, index) => (
                <div key={index}>
                    <p>id: {album.id}, title: {album.title}</p><br />
                    <button onClick={() => displayPhotosFunc(album)}>open album</button>
                </div>
            ))}
            <button onClick={()=>isToAddAlbumFunc(false)}>add album</button>
        </>
    )
}
export default Albums;