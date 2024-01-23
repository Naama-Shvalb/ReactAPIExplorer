import React, { useState, useParams, useContext} from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {UserContext} from '../contexts/UserProvider';
import './SignUpLogin.css';

const Home = () => {

    //const currentUser = JSON.parse(localStorage.getItem("activeUser"));
    const { user } = useContext(UserContext);
    const navigate = useNavigate(); 

    const handleLogOut = () => {
        localStorage.setItem('activeUser', '');
        navigate('/login');

    };

    return(
        <>
            <h1>Hi {user.name}</h1>
            <button onClick={handleLogOut}>Logout</button>
            <button onClick={()=>navigate("albums")}>Albums</button>
            <button onClick={()=>navigate("posts")}>Posts</button>
            <button onClick={()=>navigate("todos")}>Todos</button>
            <button onClick={()=>navigate("info")}>Info</button>
            <Outlet />
        </>
    );
};

export default Home;