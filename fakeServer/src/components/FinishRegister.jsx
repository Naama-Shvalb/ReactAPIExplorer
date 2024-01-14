import React, { useState } from 'react';
import Login  from './Login'
import Register from './Register';
import { User } from '../User';
import './SignUpLogin.css';

const FinishRegister = ({userName, password})=>{

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [street, setStreet] = useState('');
    const [suite, setSuite] = useState('');
    const [city, setCity] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [phone, setPhone] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [catchPhrase, setCatchPhrase] = useState('');
    const [bs, setBs] = useState('');
    const [isLoggedInUser, setisLoggedInUser] = useState(false);

    
    const HandleFinishRegister = ()=>{
        const adress = {street, suite, city, zipcode};
        const newUser = new User(findUserId(), name, userName, email, adress, phone, password, company);

        fetch('http://localhost:3000/users', {
          method: 'POST',
          body: JSON.stringify(newUser),
        })
          .then(response => response.json())
          .then(json => console.log(json))
          .catch(error => console.error('Error:', error));
        
        loginUser(newUser);


    }

    const findUserId = () => {
        const usersArr = fetch('http://localhost:3000/users')
            .then(response => response.json())

        const id = usersArr[length].id + 1;
        return id;
    }

    const loginUser = (user) => {
      const storedUsers = JSON.parse(localStorage.getItem('storedUser')) || [];
      storedUsers.push(user);
      localStorage.setItem('storedUsers', JSON.stringify(storedUsers));
      setisLoggedInUser(true);
    };


    return(
        <>
         <div>
          {isLoggedInUser ? (
            <Home>
            </Home>
          ) : (
            <div className='signUpLogin-container'> 
              <h2>Sign up</h2>
              <input
                type="text"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <lable>address:</lable>
                    <input
                    type="text"
                    placeholder="Street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    /> 
                    <input
                    type="text"
                    placeholder="Suite"
                    value={suite}
                    onChange={(e) => setSuite(e.target.value)}
                    />  
                    <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    />  
                    <input
                    type="number"
                    placeholder="Zip Code"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                    />
                    <label>Geo</label>
                        <input
                        type="number"
                        placeholder="lat"
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                        />
                        <input
                        type="number"
                        placeholder="lng"
                        value={lng}
                        onChange={(e) => setLng(e.target.value)}
                        />
              <input
                type="number"
                placeholder="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <label>company</label>
                <input
                    type="text"
                    placeholder="name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                /><input
                    type="text"
                    placeholder="catchPhrase"
                    value={catchPhrase}
                    onChange={(e) => setCatchPhrase(e.target.value)}
                /><input
                    type="text"
                    placeholder="bs"
                    value={bs}
                    onChange={(e) => setBs(e.target.value)}
                />
            
              <button className='signUpBtn' onClick={HandleFinishRegister}>Signup</button>
              <br />

            </div>
          )}
        </div>
        </>
    )
}

export default FinishRegister