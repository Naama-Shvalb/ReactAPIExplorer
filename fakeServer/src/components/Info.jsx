import {UserContext} from '../contexts/UserProvider';
import React, {useContext} from 'react';
import '../styles/Global.css';
import '../styles/Info.css';

const Info = () => {
    const { user, setCurrentUser } = useContext(UserContext);

    //const currentUser = JSON.parse(localStorage.getItem("activeUser"));   
    return (
        <>
        <div className="info-container">
            <h1 className="info-heading">Info</h1>
            <div className="info-content">
            <span><strong>name:</strong> {user.name}</span>
            <span><strong>email:</strong> {user.email}</span>
            <span><strong>username:</strong> {user.username}</span>
            <span><strong>address:</strong> <br />
            street: {user.address.street}<br />
            suite: {user.address.suite}<br />
            city: {user.address.city}<br />
            zipcode: {user.address.zipcode}<br />
            </span>
            <span><strong>geo:</strong> <br />
            lat: {user.address.geo.lat}<br />
            lng: {user.address.geo.lng}<br />
            </span>
            <span><strong>phone:</strong> {user.phone}</span>
            <span><strong>company:</strong> <br />
            name: {user.company.name}<br />
            catchPhrase: {user.company.catchPhrase}<br />
            bs: {user.company.bs}<br />
            </span>
            </div>
        </div>
        </>
    );
};
export default Info;