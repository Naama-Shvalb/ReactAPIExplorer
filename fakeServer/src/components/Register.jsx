import React, { useState } from 'react';
import Login  from './Login';
import FinishRegister from './FinishRegister';
import './SignUpLogin.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
  
    const handleRegister = () => {

        const user = fetch(`http://localhost:3000/users?username=${username}`,{method:"HEAD"})
          .then(response => response.json())
          .then(json => console.log(json))

        if(user){
          alert('you are an existing user please log in');
          setPassword('');
        }
      
        setIsRegistered(true);

      };

      return (
        <div>
          {isRegistered ? (
            <FinishRegister props = {{username, password}}/>
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
              <button className='loginBtn' onClick={<Login/>}>login</button>
          </div>
          )}
        </div>
      );
}

export default Register