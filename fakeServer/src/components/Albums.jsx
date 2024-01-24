import { useEffect, useState, useContext } from "react";
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserProvider';
import '../styles/Global.css';
import '../styles/AlbumsAndPhotos.css';

const Albums = () => {

    const [albums, setAlbums] = useState([]);
    const [isToAddAlbum, setIsToAddAlbum] = useState(false);
    const [title, setTitle] = useState('');
    const [albumId, setAlbumId] = useState('');
    const [toSearchId, setToSearchId] = useState('');
    const [toSearchTitle, setToSearchTitle] = useState('');
    const [searchAlbumsdBy, setSearchAlbumsBy] = useState('');  

    const { user } = useContext(UserContext);

    useEffect(() => {
        fetch(`http://localhost:3000/albums?userId=${user.id}`)
            .then(response => response.json())
            .then(json => setAlbums(json));
        fetch("http://localhost:3000/nextID", {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((json) => {
                setAlbumId(json[0].nextAlbumId);
            });
    }, []);

    const addAlbum = () => {
        updateNextPostId();
        const addedAlbum = {
            "userId": `${user.id}`,
             "id": `${albumId}`, 
             "title": title 
            };
        fetch('http://localhost:3000/albums', {
            method: 'POST',
            body: JSON.stringify(addedAlbum),
        })
            .then(response => response.json())
            .catch(error => console.error('Error:', error));
        setAlbums(prevAlbums => [...prevAlbums, addedAlbum]);
        setTitle('');
        setIsToAddAlbum(false);
        getAndSetNextPostId();
    };

    const searchAlbums = (propertytype, property) => {
        if (property === '' || property === undefined) {
          fetch(`http://localhost:3000/albums?userId=${user.id}`)
              .then(response => response.json())
              .then(json => setAlbums(json));
        } else {
          fetch(`http://localhost:3000/albums?${propertytype}=${property}`)
              .then(response => response.json())
              .then(json => setAlbums(json));
        }
      };

    const cancel = () => {
        setTitle('');
        setIsToAddAlbum(false);
    };

    const getAndSetNextPostId = () => {
        fetch("http://localhost:3000/nextID", {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((json) => {
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
    };

    return (
        <>
          <div className="container">
            <h1 className="heading">Albums</h1>
            <div className="section search-section">
                <h2>Search Albums</h2>
                {searchAlbumsdBy ==='id' ?
                <>
                <input
                    type="number"
                    placeholder="id"
                    value={toSearchId}
                    onChange={(e) => setToSearchId(e.target.value)}
                />
                <button onClick={() => searchAlbums(searchAlbumsdBy, toSearchId)}>search</button>
                <button onClick={() => { cancel(); }}>cancel</button><br />
                </>
                :searchAlbumsdBy === 'title'?
                    <>
                    <input
                        type="text"
                        placeholder="title"
                        value={toSearchTitle}
                        onChange={(e) => setToSearchTitle(e.target.value)}
                    />
                    <button onClick={() => searchAlbums(searchAlbumsdBy, toSearchTitle)}>search</button>
                    <button onClick={() => { cancel(); }}>cancel</button><br />
                    </>
                    :<>
                    <button onClick={()=>setSearchAlbumsBy('id')}>search by id:</button>
                    <button onClick={()=>setSearchAlbumsBy('title')}>search by title:</button>
                    </>
                }
            </div>
            <label></label>
            {albums.map((album, index) => (
                <div key={index} className="item album-info">
                    <Link to={`${album.id}/photos`} className="album-link" state={{ album: album }}>id: {album.id}, title: {album.title}</Link>
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
                : <button onClick={() => setIsToAddAlbum(true)}>add album</button>
                }
                </div>
        </>
    );
};
export default Albums;