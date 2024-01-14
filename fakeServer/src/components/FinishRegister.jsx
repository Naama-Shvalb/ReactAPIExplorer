import React, { useState } from 'react';
import Login  from './Login'
import Register from './Register';
import { User } from '../User';
import './SignUpLogin.css';

const FinishRegister = ()=>{
    return(
        <>
         <div>
          {loggedInUser ? (
            <Home>
            </Home>
          ) : ToLogin ? (
            <Login></Login>
          ) : (
            <div className='signUpLogin-container'> 
              <h2>Sign up</h2>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className='signUpBtn' onClick={handleRegister}>Signup</button>
              <button className='loginBtn' onClick={handleLogin}>login</button>
              <br />
              <button className='enterToGameBtn'onClick={handStartGame}>enter to game</button>

            </div>
          )}
        </div>
        </>
    )
}

export default FinishRegister;