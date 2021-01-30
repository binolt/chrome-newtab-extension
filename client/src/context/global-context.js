import React, { useContext, useState, useEffect } from "react";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [weatherToggled, setWeatherToggled] = useState(false);
    const [locationDisabled, setLocationDisabled] = useState(false);

    const fetchWeatherInfo = () => {
        const localWeatherData = JSON.parse(localStorage.getItem("weather"))
        if(localWeatherData) {
            localWeatherData.weatherServices && setWeatherToggled(true);
            if(!localWeatherData.locationServices) {
                setLocationDisabled(true)
            }
        }
    }

    useEffect(() => {
        fetchWeatherInfo()
    }, [])



    const value = {
        weatherToggled,
        setWeatherToggled,
        locationDisabled, 
        setLocationDisabled
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}