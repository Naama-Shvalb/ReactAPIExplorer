import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import Photos from './Photos';
const Albums = () => {

    const [albums, setAlbums] = useState('');
    const [displayPhotos, setDisplayPhotos] = useState(false);

    const currentUser = JSON.parse(localStorage.getItem("activeUser"));


    useEffect(() => {
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
                    <p>id: {album.id}, title: {album.title}</p><br/>
                    {!displayPhotos[index]?
                    <button onClick={()=>showPhotos(album.id)}>open album</button>
                    :<Link to={`${album.id}/photos`} state={{ "album": album }}>fjggh</Link>}
                     {/* :<Photos album={ album } />} */}
                    {/* :<Link to={`${album.id}/photos`} state: { album: album }}}>fjggh</Link>  */}
                    {/* <Link to={`${album.id}/photos`} state={{album,}}>Contact</Link> */}
                    {/* // :<button onClick={()=>showPhotos(album.id)}>display photos</button> */}
                </div>
            ))}
        </>
    )
}
export default Albums;