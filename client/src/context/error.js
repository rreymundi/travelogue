import React, { useState } from "react";

const ErrorContext = React.createContext();

const ErrorProvider = ({children}) => {
    const [errors, setErrors] = useState(null);
      
    return(
        <ErrorContext.Provider value={{ errors, setErrors }}>
            {children}
        </ErrorContext.Provider>
    );
};

export { ErrorContext, ErrorProvider };