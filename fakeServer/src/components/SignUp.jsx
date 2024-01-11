import React, { useState } from 'react';
import Login  from './Login'
import { User } from '../User';
import './SignUpLogin.css';

const SingUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [loggedInUser, setLoggedInUser] = useState(false);
    const [ToLogin, setToLogin] = useState(false);

    const handleSignup = () => {
        const storedUser = JSON.parse(localStorage.getItem('storedUser')) || [];
        if(storedUser.find(Element=>(Element.email === email))){
          alert('you are an existing user please log in');
          setEmail('');
        }
        const newUser = new User(username, email);
        storedUser.push(newUser);
        storedUser.sort((a, b) => a.averageScore - b.averageScore);
        localStorage.setItem('storedUser', JSON.stringify(storedUser));
        alert('The user has successfully registered');
        setToLogin(true);
        loginUser();
      };

    const loginUser = () => {
      const storedUser = JSON.parse(localStorage.getItem('storedUser')) || [];
      const user = storedUser.find(Element=>(Element.email === email));
      if(user){
        if(playerCollection.getPlayer(email)){
          alert("You are already in the game");
        } else {
          const myPlayer = new CurrentPlayer(user.name, user.email, user.maxScore);
          playerCollection.addPlayer(myPlayer);
        }
      } else {
        alert('you are not an existing user please insert another user or sign up');
      }
      setEmail("");
    };

    const handleLogin = () => {
      setToLogin(true);
    };

    const handStartGame = () => {
      if(playerCollection.getAllPlayers().length < 2){
        alert("There are not enough players for the game, please add more players");
      } else {
        setLoggedInUser(true);
      }
    };

      return (
        <div>
          {loggedInUser ? (
            <GameBoard>
            </GameBoard>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className='signUpBtn' onClick={handleSignup}>Signup</button>
              <button className='loginBtn' onClick={handleLogin}>login</button>
              <br />
              <button className='enterToGameBtn'onClick={handStartGame}>enter to game</button>

            </div>
          )}
        </div>
      );
}

export default SingUp