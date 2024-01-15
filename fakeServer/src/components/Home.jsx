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


    const handleInfoBtn = () => {
        navigate('/home/info');
    }

    const handleLogOut = () => {
        users.pop();
        localStorage.setItem('storedUsers', JSON.stringify(users));
        navigate('/login')

    }

    const handleTodosBtn = () => {
        navigate('/home/todos');
    }

    return(
        <>
            <h1>Hi {currentUser.name}</h1>
            <button onClick={handleLogOut}>Logout</button>
            <button>Albums</button>
            <button>Posts</button>
            <button onClick={handleTodosBtn}>Todos</button>
            <button onClick={handleInfoBtn}>Info</button>
            <Outlet />
        </>
    )
}

export default Home