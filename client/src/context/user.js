import React, { useState } from "react";

const UserContext = React.createContext();

const UserProvider = ({children}) => {
    const [user, setCurrentUser] = useState(null);
      
    return(
        <UserContext.Provider value={{ user, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };