import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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

    // async function getUserPhotos() {
    //     const response = await fetch(`http://localhost:3000/albums/${id}/photos?_start=${start}&_limit=${limit}`)
    //         .catch(error => {
    //             console.log("Error:", error);
    //         });
    //     const json_response = await response.json();
    //     if (json_response.length >= 1) {
    //         setUserPhotos([...json_response])
    //     }
    // }

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
    };

    const updatePhoto = (photoToUpdateObj) => {
        if (url == '')
            setUrl(photoToUpdateObj.url);
        if (thumbnailUrl == '')
            setThumbnailUrl(photoToUpdateObj.thumbnailUrl);
        fetch(`http://localhost:3000/photos/${photoToUpdateId}`, {
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
        const updatedPhoto = {albumId: photoToUpdateObj.albumId, id: photoToUpdateObj.id, title: photoToUpdateObj.title, thumbnailUrl: thumbnailUrl, url: url};
        setPhotos((prevPhotos) =>
            prevPhotos.map((photo) => photo.id === photoToUpdateId ? updatedPhoto : photo));
        setPhotoToUpdateId('');
    };

    const addPhoto = () => {
        updateNextPostId();
        const addedPhoto = { "albumId": album.id, "id": `${photoId}`, "title": title, "url": url, "thumbnailUrl": thumbnailUrl };
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

    const displayMorePhotos = () =>{
        const photoArrayList=photos.length;
        fetch(`http://localhost:3000/photos?albumId=${album.id}&_start=${photoArrayList}&_end=${photoArrayList+10}`)
        .then(response => response.json())
        .then(json => setPhotos(prevPhotos=>[...prevPhotos,json]));
    };

    return (
        <>
            <h3>album id: {album.id}, album title: {album.title}</h3>
            <h1>Photos</h1>
            {photos.map((photo, i) => (
                <span key={i}>
                    <img src={`${photo.thumbnailUrl}`} width="150" height="150" />
                    <button onClick={() => deletePhoto(photo.id)}>delete photo</button>
                    {photoToUpdateId == photo.id ?
                        <>
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
                            />
                            <button onClick={() => updatePhoto(photo)}>update</button>
                            <button onClick={() => setPhotoToUpdateId('')}>cancel</button>
                        </>
                        : <button onClick={() => setPhotoToUpdateId(photo.id)}>update photo</button>}
                </span>
            ))}
            <br />
            <button onClick={displayMorePhotos}>more photos</button>
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
        </>
    );
};
export default Photos;