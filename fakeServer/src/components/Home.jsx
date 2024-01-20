import React, { useState,  createContext , useParams} from 'react';
import { Outlet } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';
import Info from './Info';
import Todos from './Todos';
import './SignUpLogin.css';

const Home = () => {

    const currentUser = JSON.parse(localStorage.getItem("activeUser"));
    const navigate = useNavigate(); 

    const handleLogOut = () => {
        localStorage.setItem('activeUser', '');
        navigate('/login');

    };

    // const handleInfoBtn = () => {
    //     navigate('info');
    // }

    // const handleTodosBtn = () => {
    //     navigate('todos');
    // }

    // const handlePostsBtn = ()=>{
    //     navigate('posts');
    // }

    const handelNavBtn = (target) => {
        navigate(`${target}`);
    };

    return(
        <>
            <h1>Hi {currentUser.name}</h1>
            <button onClick={handleLogOut}>Logout</button>
            <button onClick={()=>handelNavBtn("albums")}>Albums</button>
            <button onClick={()=>handelNavBtn("posts")}>Posts</button>
            <button onClick={()=>handelNavBtn("todos")}>Todos</button>
            <button onClick={()=>handelNavBtn("info")}>Info</button>
            <Outlet />
        </>
    );
};

export default Home;