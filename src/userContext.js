import React from 'react'
const UserContext = React.createContext()

export const UserProvider = UserContext.Provider
export default UserContext

// import  {createContext} from 'react';
// export const UserContext = createContext(null);''