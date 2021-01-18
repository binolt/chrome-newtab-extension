import React, { useEffect, useState } from 'react';
import "../../css/weather/weather.css"
import Moment from "react-moment";


import {ReactComponent as SunnyIcon} from "../../icons/weather/wb_sunny-black-24dp.svg"


const Weather = () => {
    const [weatherLoaded, setWeatherLoaded] = useState(false);
    const [weatherData, setWeatherData] = useState(null);
    const date = new Date()

    useEffect(() => {
        getWeather()
    }, [])

    const getWeather = async() => {
        const city = await fetchLocation()
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=imperial`)
        .then(res => res.json())
        .then(data => {
            formatData(data)
        })
    }

    const formatData = (data) => {
        console.log(data)
        const description = capitalizeFirstLetter(data.weather[0].description);
        const temperature = Math.trunc(data.main.temp);
        const city = data.name;
        const formattedData = {
            description: description,
            temperature: temperature,
            city: city
        }
        setWeatherData(formattedData)
        setWeatherLoaded(true)
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    const fetchLocation = async () => {
        const coords = await getCoords()
        const localWeatherData = JSON.parse(localStorage.getItem("weather"));
        const updatedWeatherData = {
            ...localWeatherData,
            coords: coords
        }
        localStorage.setItem("weather", JSON.stringify(updatedWeatherData));
        return await getCity(coords);
    }
    
    const getCoords = async() => {
        return new Promise(function(resolve) {
            navigator.geolocation.getCurrentPosition(function(position) {
                if(position) {
                    resolve({longitude: position.coords.longitude, latitude: position.coords.latitude})
                }
            // if user denied geolocation services
            }, function(error) {
                if(error.code === error.PERMISSION_DENIED) {
                    console.log(error)
                }
            })
        })
    }
    
    const getCity = async(position) => {
        return new Promise(function(resolve) {
            // save loading time by checking local storage for stored city
            const localWeatherData = JSON.parse(localStorage.getItem("weather"));
            if(localWeatherData.coords) {
                //if user hasn't changed their location
                if(localWeatherData.coords.longitude === position.longitude && localWeatherData.coords.latitude === position.latitude) {
                    resolve(localWeatherData.city);
                    return;
                }
            }
            // if no local storage data, fetch city from api
            fetch(`https://us1.locationiq.com/v1/reverse.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&lat=${position.latitude}&lon=${position.longitude}&format=json`)
            .then((res => res.json()))
            .then(data => {
                const city = data.address.city;
                const localWeatherData = JSON.parse(localStorage.getItem("weather"));
                const updatedWeather = {
                    ...localWeatherData,
                    city: city
                }
                localStorage.setItem("weather", JSON.stringify(updatedWeather));
                resolve(city)
            })
        })
    }

    return weatherLoaded && weatherData && ( 
        <div className="content-weather">
            <span className="content-weather-description">
                <SunnyIcon/>
                <p>{weatherData.description}</p>
            </span>
            <span className="content-weather-body">
                <h1>{weatherData.temperature}°</h1>
                <p>{weatherData.city}</p>
            </span>
            <Moment className="content-weather-date" format="ddd" date={date}/>
        </div>
     );
}
 
export default Weather;