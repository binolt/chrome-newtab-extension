import React, { useContext, useState, useEffect } from "react";

const DEFAULT_BACKGROUND = {
    urls : {
        raw: "https://images.unsplash.com/photo-1585374591745-47614a848500?ixid=MXwxOTc0OTF8MHwxfGNvbGxlY3Rpb258MnwxMTYyNDEzNnx8fHx8Mnw&ixlib=rb-1.2.1"
    },
    user: {
        name: "Cameron Venti",
        links: {
            html: "https://unsplash.com/@ventiviews",
        }
    }
}


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
    const [quoteData, setQuoteData] = useState({isToggled: false});

    const preloadBackground = () => {
        return new Promise(function(resolve) {
            const localData = JSON.parse(localStorage.getItem("currentImage"));
            const img = new Image()
            img.src = localData ? localData.urls.raw + "&w=1500&dpr=2" : DEFAULT_BACKGROUND.urls.raw + "&w=1500&dpr=2";
            img.onload = () => {
                if(!localData) {
                    setCurrentImage(DEFAULT_BACKGROUND)
                } else {
                    setCurrentImage(localData);
                }
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

    const fetchQuoteData = () => {
        return new Promise(function(resolve) {
            const localData = JSON.parse(localStorage.getItem("quotes"));
            if(localData) {
                setQuoteData(localData)
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
            await fetchQuoteData();
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
        setTodoData,
        quoteData,
        setQuoteData
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}