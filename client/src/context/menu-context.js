import React, { useContext, useState, useEffect } from "react";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function MenuProvider({children}) {
    const [menu, setMenu] = useState('Background Image');
    const [backgroundMenu, setBackgroundMenu] = useState("Main");

    useEffect(() => {
    }, [])



    const value = {
        menu, 
        setMenu,
        backgroundMenu,
        setBackgroundMenu
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}