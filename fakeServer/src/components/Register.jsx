import React, { useState, useEffect} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Login from './Login';
import './SignUpLogin.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);

    const navigate = useNavigate();
  
    const handleRegister = () => {
      fetch(`http://localhost:3000/users?username=${username}`)
        .then(response => response.json())
        .then(user => {
    
          if (user.length > 0) {
            alert('You are an existing user. Please log in.');
            setPassword('');
          } else {
            if(verifyPassword == password){
              setIsRegistered(true);            
            }
            else{
              alert('Please validate your password.');
            }
          }
        })
        .catch(error => console.error('Error:', error));
    };

    useEffect(() => {

      const navigateToFinishRegister = () => {
        console.log("username and pass from register", username, password);
        navigate('/finishRegister', {
          state: { userName: username}
        });
      };
      if (isRegistered) {
        navigateToFinishRegister();
      }
    }, [isRegistered, navigate, username, password]);

      const handleLoginClick = () => {
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
            <input
              type="password"
              placeholder="Verify Password"
              value={verifyPassword}
              onChange={(e) => setVerifyPassword(e.target.value)}
            />
            <button className='signUpBtn' onClick={handleRegister}>Register</button>
            <button className='loginBtn' onClick= {handleLoginClick}>login</button>
        </div>

        </div>
      );
};

export default Register;