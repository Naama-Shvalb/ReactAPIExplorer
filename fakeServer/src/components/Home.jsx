import React, { useState,  createContext , useParams} from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './SignUpLogin.css';

const Home = () => {

    const currentUser = JSON.parse(localStorage.getItem("activeUser"));
    const navigate = useNavigate(); 

    const handleLogOut = () => {
        localStorage.setItem('activeUser', '');
        navigate('/login');

    };

    return(
        <>
            <h1>Hi {currentUser.name}</h1>
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