import {UserContext} from '../contexts/UserProvider';
import React, {useContext} from 'react';

const Info = () => {
    const { user, setCurrentUser } = useContext(UserContext);

    //const currentUser = JSON.parse(localStorage.getItem("activeUser"));   
    return (
        <>
        <h1>Info</h1>
            <p>
                name: {user.name}<br />
                email: {user.email}<br />
                username: {user.username}<br />
                address: <br />
                street: {user.address.street}<br />
                suite: {user.address.suite}<br />
                city: {user.address.city}<br />
                zipcode: {user.address.zipcode}<br />
                geo: <br />
                lat: {user.address.geo.lat}<br />
                lng: {user.address.geo.lng}<br />
                phone: {user.phone}<br />
                company: <br />
                name: {user.company.name}<br />
                catchPhrase: {user.company.catchPhrase}<br />
                bs: {user.company.bs}<br />
            </p>
        </>
    );
};
export default Info;