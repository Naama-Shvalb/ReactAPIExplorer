import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './SignUpLogin.css';
import Register from './Register';
import Home from './Home'

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [isLoggedInUser, setLoggedInUser] = useState(false);
  const [toRegister, setToRegister] = useState(false);

  const handleLogin = () => {
    if (name == '') {
      alert("Enter name and password")
      return;
    }
    fetch(`http://localhost:3000/users?username=${name}`)
      .then(response => response.json())
      .then(json => setUser(json));
  };

  useEffect(() => {
    localstorageAndLogin();
  }, [user]);
  
  const localstorageAndLogin = () => {
    if (user != '' && password == user[0].website) {
      const storedUsers = JSON.parse(localStorage.getItem('storedUsers')) || [];
      // storedUsers.push(user);
      localStorage.setItem('storedUsers', JSON.stringify(user));
      setLoggedInUser(true);
    }
    else if (name != '') {
      alert('try again or register');
    }
    setName('');
    setUser('');
    setPassword('');
  }
  
  const goToRegister = () => {
    setToRegister(true);
  }

  return (
    <div>
      <Navigate to={isLoggedInUser? "/home": toRegister? "/register": "/login"}/>
        <div className='signUpLogin-container'>
          <h2>insert user</h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='loginBtn' onClick={handleLogin}>Login</button>
          <button className='signUpBtn' onClick={goToRegister}>Register</button>
        </div>
    </div>
  )
}

export default Login