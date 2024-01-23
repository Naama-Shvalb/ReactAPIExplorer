import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Albums = () => {

    const [albums, setAlbums] = useState([]);
    const [isToAddAlbum, setIsToAddAlbum] = useState(false);
    const [title, setTitle] = useState('');
    const [albumId, setAlbumId] = useState('');

    const currentUser = JSON.parse(localStorage.getItem("activeUser"));
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/albums?userId=${currentUser.id}`)
            .then(response => response.json())
            .then(json => setAlbums(json))
    }, [])

    const addAlbum = () => {
        getAndSetNextPostId();
        updateNextPostId();

        const addedAlbum = { "userId": currentUser.id, "id": albumId, "title": title }
        fetch('http://localhost:3000/albums', {
            method: 'POST',
            body: JSON.stringify(addedAlbum),
        })
            .then(response => response.json())
            .catch(error => console.error('Error:', error));
        setAlbums(prevAlbums => [...prevAlbums, addedAlbum]);
        setTitle('');
        setIsToAddAlbum(false);
    }

    const cancel = () => {
        setTitle('');
        setIsToAddAlbum(false);
    }

    const getAndSetNextPostId = () => {
        fetch("http://localhost:3000/nextID", {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setAlbumId(json[0].nextAlbumId);
            });
    };

    const updateNextPostId = () => {
        fetch("http://localhost:3000/nextID/1", {
            method: "PATCH",
            body: JSON.stringify({
                "nextAlbumId": albumId + 1
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
            <h1>Albums</h1>
            <label></label>
            {albums.map((album, index) => (
                <div key={index}>
                    <p>id: {album.id}, title: {album.title}</p><br />
                    {/* <button onClick={() => displayPhotosFunc(album)}>open album</button> */}
                    <button onClick={() => navigate(`${album.id}/photos`, { state: { album: album } })}>open album</button>
                </div>
            ))}
            {isToAddAlbum ?
                <>
                    <input
                        type="text"
                        placeholder="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <button onClick={addAlbum}>add</button>
                    <button onClick={cancel}>cancel</button>
                </>
                : <button onClick={() => setIsToAddAlbum(true)}>add album</button>}
        </>
    )
}
export default Albums;