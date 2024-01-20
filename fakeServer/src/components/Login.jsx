import React, { useEffect, useState } from 'react';
import { Navigate, json, useNavigate } from 'react-router-dom';
import './SignUpLogin.css';
import Register from './Register';
import Home from './Home';


const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const [toRegister, setToRegister] = useState(false);

  console.log('user:', user);
  console.log('user id:',  user.id);

  const handleLogin = () => {
    if (name == '') {
      alert("Enter name and password");
      return;
    }
    fetch(`http://localhost:3000/users?username=${name}`)
      .then(response => response.json())
      .then(jsonUser => {
        setUser(jsonUser[0]);
      });
  };

  useEffect(() => {
    localstorageAndLogin();
  }, [user]);
  
  const localstorageAndLogin = () => {
    if (user != '' && password == user.website) {
      localStorage.setItem('activeUser', JSON.stringify(user));
      setIsLoggedInUser(true);
    }
    else if (name != '') {
      alert('try again or register');
    }
    setName('');
    //setUser('');
    setPassword('');
  };
  
  const goToRegister = () => {
    setToRegister(true);
  };

  return (
    <div>
      <Navigate to={isLoggedInUser? `/users/${user.id}/home`: toRegister? "/register": "/login"}/>
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
  );
};

export default Login;