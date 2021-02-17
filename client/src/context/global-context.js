import React, { useContext, useState, useEffect } from "react";

const DEFAULT_BACKGROUND = "https://res.cloudinary.com/dxqmbhsis/image/upload/v1610226492/clouds_background_pkxdke.jpg"


const AuthContext = React.createContext();

export function useGlobalAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [weatherToggled, setWeatherToggled] = useState(false);
    const [locationDenied, setLocationDenied] = useState(false);
    const [loaded, setLoaded] = useState(false)
    const [currentImage, setCurrentImage] = useState(null);
    const [favorited, setFavorited] = useState([]);
    const [todoData, setTodoData] = useState({isToggled: false});

    const preloadBackground = () => {
        return new Promise(function(resolve) {
            const localData = JSON.parse(localStorage.getItem("currentImage"));
            const img = new Image()
            img.src = localData ? localData.urls.raw + "&w=1500&dpr=2" : DEFAULT_BACKGROUND;
            img.onload = () => {
                setCurrentImage(localData);
                resolve()
            }
        })
      }

    const fetchWeatherInfo = () => {
        return new Promise(function(resolve) {
            const localWeatherData = JSON.parse(localStorage.getItem("weather"))
            //if weather data exists in local storage
            if(localWeatherData) {
                localWeatherData.enabled && setWeatherToggled(true);
                localWeatherData.denied && setLocationDenied(true)
            }
            resolve();
        })
    }

    const loadFavorites = () => {
        return new Promise(function(resolve) {
            const favList = JSON.parse(localStorage.getItem("favorited"))
            setFavorited(favList);
            resolve()
        })
    }

    const fetchTodoData = () => {
        return new Promise(function(resolve) {
            const localData = JSON.parse(localStorage.getItem("todo-list"));
            if(localData) {
                setTodoData(localData)
            }
            resolve()
        })
    }

    useEffect(() => {
        const loadApp = async () => {
            await preloadBackground();
            await fetchWeatherInfo();
            await loadFavorites();
            await fetchTodoData();
            setLoaded(true);
        }
        loadApp();
    }, [])



    const value = {
        weatherToggled,
        setWeatherToggled,
        locationDenied, 
        setLocationDenied,
        currentImage,
        setCurrentImage,
        loaded,
        favorited,
        setFavorited,
        todoData,
        setTodoData
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}