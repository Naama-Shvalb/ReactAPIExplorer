import React, { useState } from 'react';
import SignUp from './SignUp';
import { User } from '../User';
import './SignUpLogin.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(false);
  const [ToSignUp, setToSignUp] = useState(false);

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem('storedUser')) || [];
    const user = storedUser.find(Element=>(Element.email === email));
    if(user){
      if(playerCollection.getPlayer(email)){
        alert("You are already in the game");
      } else {
        const myPlayer = new CurrentPlayer(user.name, user.email, user.scores);
        playerCollection.addPlayer(myPlayer);
      }
    } else {
      alert('you are not an existing user please insert another user or sign up');
    }
    setEmail("");
  };

  const handSingUp = () => {
    setToSignUp(true);
  };

  const handStartGame = () => {
    playerCollection.setActive(playerCollection.players[0]);
    playerCollection.setCurrentIndex(0);
    setLoggedInUser(true);
  };

  return (
    <div>
      {loggedInUser ? (
       <GameBoard></GameBoard>
      ) : ToSignUp ? (<SignUp></SignUp>) : (
        <div className='signUpLogin-container'>
          <h2>insert user</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className='loginBtn' onClick={handleLogin}>Login</button>
          <button className='signUpBtn' onClick={handSingUp}>sing up</button>
          <br />
          <button className='enterToGameBtn'onClick={handStartGame}>enter to game</button>
        </div>
      )}
    </div>
  )
}

export default  Login