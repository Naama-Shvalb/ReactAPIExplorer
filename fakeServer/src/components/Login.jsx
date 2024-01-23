import React, { useEffect, useState ,useContext} from 'react';
import { Navigate, json, useNavigate } from 'react-router-dom';
import './SignUpLogin.css';
import Register from './Register';
import Home from './Home';
import {UserContext} from '../contexts/UserProvider';


const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  //const [user, setUser] = useState('');
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const [toRegister, setToRegister] = useState(false);

  const { user, setCurrentUser } = useContext(UserContext);

  console.log('user:', user);
  console.log('user id:',  user.id);

  const handleLogin = () => {
    if (userName == '') {
      alert("Enter name and password");
      return;
    }
    fetch(`http://localhost:3000/users?username=${userName}`)
      .then(response => response.json())
      .then(jsonUser => {
        setCurrentUser(jsonUser[0]);
      });
  };

  useEffect(() => {
    localstorageAndLogin();
  }, [user]);
  
  const localstorageAndLogin = () => {
    if (user != '' && password == user.website) {
      setCurrentUser(user);
      //localStorage.setItem('activeUser', JSON.stringify(user.username));
      setIsLoggedInUser(true);
    }
    else if (userName != '') {
      alert('try again or register');
    }
    setUserName('');
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
            placeholder="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
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