import React, { useState} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Login from './Login';
import './SignUpLogin.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);

    const navigate = useNavigate();
  
    const handleRegister = () => {

        const user = fetch(`http://localhost:3000/users?username=${username}`)
          .then(response => response.json())
          .then(json => console.log(json))
          .then(json => console.log(json))

        if(user.legth > 0){
          alert('you are an existing user please log in');
          setPassword('');
        }
      
        setIsRegistered(true);

      };

      const navigateToFinishRegister = () => {
        // Navigate to the '/finish-register' route with props in the URL
        navigate('/finishRegister', {
          state: { username, password }
        });
      };

      const handleLoginClick = () => {
        // Navigate to the '/login' route
        navigate('/login');
      };

      return (
        <div>
          {isRegistered ? (
            navigateToFinishRegister()
          ) : (
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
          )}
        </div>
      );
}

export default Register