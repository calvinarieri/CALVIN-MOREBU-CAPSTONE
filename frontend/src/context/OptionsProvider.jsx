import { createContext, useContext, useState } from "react";
import { AuthContext } from "./auth/AuthContext";

const OptionsContext = createContext(null);

export default function OptionsProvider ({children}) {
    const {user} = useContext(AuthContext);
    
    return(
        <OptionsContext.Provider>
            {children}
        </OptionsContext.Provider>
    )
}