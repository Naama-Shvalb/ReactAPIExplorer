/* eslint-disable no-unused-vars */
import React, { useState, useEffect} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Login from './Login';
import './SignUpLogin.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);

    const navigate = useNavigate();
  
    const handleRegister = () => {
      fetch(`http://localhost:3000/users?username=${username}`)
        .then(response => response.json())
        .then(user => {
          console.log(user); // Log the user data for debugging
    
          if (user.length > 0) {
            alert('You are an existing user. Please log in.');
            setPassword('');
          } else {
            // User is not found, navigate to finishRegister
            setIsRegistered(true);
          }
        })
        .catch(error => console.error('Error:', error));
    };

    useEffect(() => {

      const navigateToFinishRegister = () => {
        console.log("username and pass from register", username, password);
        // Navigate to the '/finish-register' route with props in the URL
        navigate('/finishRegister', {
          state: { userName: username}
        });
      };
      if (isRegistered) {
        navigateToFinishRegister();
      }
    }, [isRegistered, navigate, username, password]);


      // const navigateToFinishRegister = () => {
      //   // Navigate to the '/finish-register' route with props in the URL
      //   navigate('/finishRegister', {
      //     state: { username, password }
      //   });
      // };

      const handleLoginClick = () => {
        // Navigate to the '/login' route
        navigate('/login');
      };

      return (
        <div>
          <div className='signUpLogin-container'> 
            <h2>Register</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className='signUpBtn' onClick={handleRegister}>Register</button>
            <button className='loginBtn' onClick= {handleLoginClick}>login</button>
        </div>

        </div>
      );
};

export default Register;