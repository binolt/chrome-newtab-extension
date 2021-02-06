import React, { useContext, useState, useEffect } from "react";

const DEFAULT_BACKGROUND = "https://res.cloudinary.com/dxqmbhsis/image/upload/v1610226492/clouds_background_pkxdke.jpg"


const AuthContext = React.createContext();

export function useGlobalAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [weatherToggled, setWeatherToggled] = useState(false);
    const [locationDisabled, setLocationDisabled] = useState(false);
    const [loaded, setLoaded] = useState(false)
    const [backgroundImage, setBackgroundImage] = useState("")

    const preloadBackground = () => {
        return new Promise(function(resolve) {
            const background = localStorage.getItem("backgroundImg")
            const img = new Image()
            img.src = background ? background : DEFAULT_BACKGROUND;
            img.onload = () => {
                setBackgroundImage(img.src);
                resolve()
            }
        })
      }

    const fetchWeatherInfo = () => {
        return new Promise(function(resolve) {
            const localWeatherData = JSON.parse(localStorage.getItem("weather"))
            //if weather data exists in local storage
            if(localWeatherData) {
                localWeatherData.weatherServices && setWeatherToggled(true);
                if(!localWeatherData.locationServices) {
                    setLocationDisabled(true)
                }
            }
            resolve();
        })
    }

    useEffect(() => {
        const loadApp = async () => {
            await preloadBackground();
            await fetchWeatherInfo();
            setLoaded(true);
        }
        loadApp();
    }, [])



    const value = {
        weatherToggled,
        setWeatherToggled,
        locationDisabled, 
        setLocationDisabled,
        backgroundImage,
        setBackgroundImage,
        loaded
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}