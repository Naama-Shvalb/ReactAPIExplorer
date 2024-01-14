import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './SignUpLogin.css';


const Home = ()=>{
    let currentUser = JSON.parse(localStorage.getItem("storedUser"));
    return(
        <>
            <h1>{currentUser[0].name}</h1>
            <button>Logout</button>
            <button>Albums</button>
            <button>Posts</button>
            <button>Todos</button>
            <button>Info</button>
            <Outlet />
        </>
    )
}

export default Home