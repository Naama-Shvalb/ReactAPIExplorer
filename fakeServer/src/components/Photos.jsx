import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import '../styles/Global.css';
import '../styles/AlbumsAndPhotos.css';

const Photos = () => {

    const location = useLocation();
    const { album } = location.state;

    const [photos, setPhotos] = useState([]);
    const [photoId, setPhotoId] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const [isToAddPhoto, setIsToAddPhoto] = useState('');
    const [photoToUpdateId, setPhotoToUpdateId] = useState('');
    const [isMorePhotos, setIsMorePhotos]=useState(true);

    useEffect(() => {
        fetch(`http://localhost:3000/photos?albumId=${album.id}&_limit=10`)
            .then(response => response.json())
            .then(json => setPhotos(json));
        fetch("http://localhost:3000/nextID", {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setPhotoId(json[0].nextPhotoId);
            });
    }, []);

    useEffect(() => {
        setThumbnailUrl('');
        setTitle('');
        setUrl('');
    }, [photoToUpdateId, isToAddPhoto]);

    const deletePhoto = (photoIdToDelete) => {
        fetch(`http://localhost:3000/photos/${photoIdToDelete}`, {
            method: "DELETE",
        })
            .then(response => response.json());

        setPhotos(prevPhotos => prevPhotos.filter(photo => { return photo.id !== photoIdToDelete; }));
        if(photo.length==0)
            displayMorePhotos();
    };

    const updatePhoto = (photoToUpdateObj) => {
        if (url == '')
            setUrl(photoToUpdateObj.url);
        if (thumbnailUrl == '')
            setThumbnailUrl(photoToUpdateObj.thumbnailUrl);
        fetch(`http://localhost:3000/photos/${photoToUpdateObj.id}`, {
            method: "PATCH",
            body: JSON.stringify({
                "thumbnailUrl": thumbnailUrl,
                "url": url,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
        const updatedPhoto = {
            albumId: photoToUpdateObj.albumId,
            id: photoToUpdateObj.id,
            title: photoToUpdateObj.title,
            thumbnailUrl: thumbnailUrl,
            url: url
        };
        setPhotos((prevPhotos) =>
            prevPhotos.map((photo) => { return photo.id === photoToUpdateId ? updatedPhoto : photo }));
        setPhotoToUpdateId('');
    };

    const addPhoto = () => {
        updateNextPostId();
        const addedPhoto = { "albumId": `${album.id}`, "id": `${photoId}`, "title": title, "url": url, "thumbnailUrl": thumbnailUrl };
        fetch('http://localhost:3000/photos', {
            method: 'POST',
            body: JSON.stringify(addedPhoto),
        })
            .then(response => response.json())
            .catch(error => console.error('Error:', error));
        setPhotos(prevPhotos => [...prevPhotos, addedPhoto]);
        setIsToAddPhoto(false);
        getAndSetNextPostId();
    };

    const getAndSetNextPostId = () => {
        fetch("http://localhost:3000/nextID", {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setPhotoId(json[0].nextPhotoId);
            });
    };

    const updateNextPostId = () => {
        fetch("http://localhost:3000/nextID/1", {
            method: "PATCH",
            body: JSON.stringify({
                "nextPhotoId": photoId + 1
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
    };

    const displayMorePhotos = () => {
        const photoArrayList = photos.length;
        fetch(`http://localhost:3000/photos?albumId=${album.id}&_start=${photoArrayList}&_end=${photoArrayList + 10}`)
            .then(response => response.json())
            .then(json =>{json.length==0? setIsMorePhotos(false) :setPhotos(prevPhotos => [...prevPhotos].concat(json))})
    };

    return (
        <>
            <div className="container">
                <h3>album id: {album.id}, album title: {album.title}</h3>
                <h1 className="heading">Photos</h1>
                <div className="photo-container">
                    {photos.map((photo, i) => (
                        <div key={i} className="photo">
                            <img src={`${photo.thumbnailUrl}`} />
                            <div className="button-container">
                                {photoToUpdateId === photo.id ? (
                                    <><div className="updateInput">
                                        <input
                                            type="text"
                                            placeholder="thumbnailUrl"
                                            value={thumbnailUrl}
                                            onChange={(e) => setThumbnailUrl(e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            placeholder="url"
                                            value={url}
                                            onChange={(e) => setUrl(e.target.value)}
                                        /></div>
                                        <div className="updateButton">
                                            <button onClick={() => updatePhoto(photo)}>send</button>
                                            <button onClick={() => setPhotoToUpdateId('')}>cancel</button>
                                        </div>
                                    </>
                                )
                                    : <>
                                        <button onClick={() => { setPhotoToUpdateId(photo.id); }}>update</button>
                                        <button onClick={() => deletePhoto(photo.id)}>delete</button>
                                    </>
                                }
                            </div>
                        </div>
                    ))}

                </div>
                <br />
                {isMorePhotos&&<button onClick={displayMorePhotos}>more photos</button>}
                {isToAddPhoto ? <>
                    <input
                        type="text"
                        placeholder="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="thumbnailUrl"
                        value={thumbnailUrl}
                        onChange={(e) => setThumbnailUrl(e.target.value)}
                    />
                    <button onClick={addPhoto}>add</button>
                    <button onClick={() => setIsToAddPhoto(false)}>cancel</button>
                </>
                    : <button onClick={() => setIsToAddPhoto(true)}>add photo</button>
                }
            </div>

        </>
    );
};
export default Photos;