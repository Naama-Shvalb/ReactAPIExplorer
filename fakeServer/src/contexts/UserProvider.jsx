import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {


  const initialUser = {
    username: '',
  };
  const [user, setUser] = useState(initialUser);

  const updateUser = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const setCurrentUser = (user) => {
    setUser(user);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;