import React, { useState,  createContext } from 'react';
import { Outlet } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';
import Info from './Info'
import Todos from './Todos';
import './SignUpLogin.css';

const Home = () => {

    const users = JSON.parse(localStorage.getItem("storedUsers"));
    const currentUser = users[users.length-1];
    const navigate = useNavigate();

    const handleLogOut = () => {
        users.pop();
        localStorage.setItem('storedUsers', JSON.stringify(users));
        navigate('/login')

    }

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
    }

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
    )
}

export default Home