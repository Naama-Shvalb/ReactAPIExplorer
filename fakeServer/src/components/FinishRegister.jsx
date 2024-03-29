import React, { useState, useContext } from 'react';
import { Navigate} from 'react-router-dom';
import { User , Address, Company, Geo} from '../User';
import {UserContext} from '../contexts/UserProvider';
import '../styles/RegisterAndLogin.css';

const FinishRegister = ({userName})=>{

    const [userId, setUserId] = useState('');
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

    const { user, setCurrentUser } = useContext(UserContext);

    
    const handleFinisRegister = ()=> {

        getAndSetNextUserId();
        updateNextUserId();

        const geo = new Geo(lat, lng);
        const adress = new Address(street, suite, city, zipcode, geo);
        const company = new Company(companyName, catchPhrase, bs);
        const newUser = new User(userId, name, userName, email, adress, phone, '', company);
        
        fetch('http://localhost:3000/users', {
          method: 'POST',
          body: JSON.stringify(newUser),
        })
          .then(response => response.json())
          .catch(error => console.error('Error:', error));
        
        loginUser();
    };

    const getAndSetNextUserId = () => {
      fetch("http://localhost:3000/nextID", {
        method: 'GET'
      })
        .then((response) => response.json())
        .then((json) => {
            setUserId(json[0].nextUserId);
        });
    };

    const updateNextUserId = () => {
      fetch("http://localhost:3000/nextID/1", {
            method: "PATCH",
            body: JSON.stringify({
                "nextUserId": userId + 1
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
    };

    const loginUser = () => {
      setCurrentUser(user);
      setCurrentUser(user);
      setisLoggedInUser(true);
    };


    return(
        <>
         <div>
          <Navigate to={isLoggedInUser? `/users/${userId}/home`: "/finishRegister"}/>
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
              <p>address:</p>
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
                    <p>Geo</p>
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
              <p>company</p>
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
            
              <button className='signUpBtn' onClick={handleFinisRegister}>Signup</button>
              <br />

            </div>
          
        </div>
        </>
    );
};

export default FinishRegister;