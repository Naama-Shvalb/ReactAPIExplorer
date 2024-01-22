import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";

const Photos = () => {
    const location = useLocation();
    const { album } = location.state;

    const [photos, setPhotos] = useState('');
    const [isToDeletePhoto, setIsToDeletePhoto] = useState(false);

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
        fetch(`http://localhost:3000/photos?albumId=${album.id}`)
            .then(response => response.json())
            .then(json => setPhotos(json))
    }, [])

    const deletePhoto = (photoIdToDelete) => {
        fetch(`http://localhost:3000/photos/${photoIdToDelete}`, {
            method: "DELETE",
        })
            .then(response => response.json())

        setPhotos(prevPhotos => prevPhotos.filter(photo => { return photo.id !== photoIdToDelete; }));
    }

    const updatePhoto = () => {

    }

    if (photos == '')
        return (
            <></>
        )
    return (
        <>
            <h1>Photos</h1>
            {photos.map((photo, i) => (
                <span key={i}>
                    <img src={`${photo.thumbnailUrl}`} width="150" height="150" />
                    <button onClick={() => deletePhoto(photo.id)}>delete photo</button>
                    <button onClick={() => updatePhoto(photo.id)}>update photo</button>
                </span>
            ))}
        </>
    )
}
export default Photos;