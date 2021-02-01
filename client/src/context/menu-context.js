import React, { useContext, useState, useEffect } from "react";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function MenuProvider({children}) {
    const [menu, setMenu] = useState('Profile');

    useEffect(() => {
    }, [])



    const value = {
        menu, 
        setMenu
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}