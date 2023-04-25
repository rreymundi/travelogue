import React, { useState } from "react";

const TravelogueContext = React.createContext();

const TravelogueProvider = ({children}) => {
    const [travelogue, setTravelogue] = useState('null');
      
    return(
        <TravelogueContext.Provider value={{ travelogue, setTravelogue }}>
            {children}
        </TravelogueContext.Provider>
    );
};

export { TravelogueContext, TravelogueProvider };