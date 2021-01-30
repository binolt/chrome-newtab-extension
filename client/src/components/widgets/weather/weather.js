import React, { useEffect, useState } from 'react';
import Moment from "react-moment";
import { useAuth } from '../../../context/WidgetContext';
import weatherService from "../../../services/weather-service";
import WeatherIcon from './weather-icon';

//ICONS


const Weather = () => {
    const {weatherToggled, setLocationDisabled} = useAuth();
    const [weatherData, setWeatherData] = useState(null);


    useEffect(() => { 
        weatherToggled && getWeather()
    }, [weatherToggled])

    const getWeather = async() => {
        const location = await fetchLocation()
        //if location services are blocked
        if(location.denied) {
            return;
        }
        //fetch weather api with city
        const data = await weatherService.fetchWeather(location.city);
        formatData(data)
    }

    const fetchLocation = async () => {
        const coords = await getCoords()
        //if user has location services blocked
        if(coords.denied) {
            return coords;
        }
        // set cords in local storage
        const localWeatherData = JSON.parse(localStorage.getItem("weather"));
        const updatedWeatherData = {
            ...localWeatherData,
            coords: coords
        }
        localStorage.setItem("weather", JSON.stringify(updatedWeatherData));
        //fetch city with coords
        return await getCity(coords);
    }

    
    const getCoords = async() => {
        return new Promise(function(resolve) {
            navigator.geolocation.getCurrentPosition(function(position) {
                if(position) {
                    //set coords in local storage
                    const localWeatherData = JSON.parse(localStorage.getItem("weather"));
                    const updatedWeatherData = {
                        ...localWeatherData,
                        locationServices: true
                    }
                    localStorage.setItem("weather", JSON.stringify(updatedWeatherData))
                    setLocationDisabled(false);
                    //resolve promise w/ coords
                    resolve({longitude: position.coords.longitude, latitude: position.coords.latitude})
                }
            // if user denied geolocation services
            }, function(error) {
                if(error.code === error.PERMISSION_DENIED) {
                    // set location disabled in local storage
                    const localWeatherData = JSON.parse(localStorage.getItem("weather"));
                    const updatedWeatherData = {
                        ...localWeatherData,
                        locationServices: false
                    }
                    localStorage.setItem("weather", JSON.stringify(updatedWeatherData))
                    setLocationDisabled(true);
                    //resolve promise w/ error
                    resolve({denied: true, error: error});
                }
            })
        })
    }
    
    const getCity = async({longitude, latitude}) => {
        return new Promise(function (resolve) {
            // check local storage for stored city
            const localWeatherData = JSON.parse(localStorage.getItem("weather"));
            if(localWeatherData.coords && localWeatherData.city) {
                //if user hasn't changed their location
                if(localWeatherData.coords.longitude === longitude && localWeatherData.coords.latitude === latitude) {
                    resolve({city: localWeatherData.city});
                    return;
                }
            }
            // if no local storage data, fetch city from api
            weatherService.fetchCity(latitude, longitude)
            .then(data => {
                const city = data.address.city;
                // set city in local storage
                const localWeatherData = JSON.parse(localStorage.getItem("weather"));
                const updatedWeather = {
                    ...localWeatherData,
                    city: city
                }
                localStorage.setItem("weather", JSON.stringify(updatedWeather));
                //resolve promise with city
                resolve({city: city})
            })
        })
    }

    const formatData = (data) => {
        console.log(data)
        const desc = capitalizeFirstLetter(data.weather[0].description);
        const temp = Math.trunc(data.main.temp);
        const city = data.name;
        let icon = data.weather[0].icon;
        if(icon.includes("n")) {
            icon = setCharAt(icon, 2, 'd')
        }
        const formattedData = {
            description: desc,
            temperature: temp,
            city: city,
            icon: icon
        }
        setWeatherData(formattedData)
    }

    //QOL FUNCTIONS
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function setCharAt(str,index,chr) {
        if(index > str.length-1) return str;
        return str.substring(0,index) + chr + str.substring(index+1);
    }

    return weatherData && weatherToggled && ( 
        <div className="content-weather">
            <span>
                <WeatherIcon name={weatherData.icon}/>
                <h1>{weatherData.temperature}°</h1>
            </span>
            <p>{weatherData.description}</p>
            {/* <span className="content-weather-description">
                <SunnyIcon/>
                <p>{weatherData.description}</p>
            </span>
            <span className="content-weather-body">
                <h1>{weatherData.temperature}°</h1>
                <p>{weatherData.city}</p>
            </span>
            <Moment className="content-weather-date" format="ddd" date={date}/> */}
        </div>
     );
}
 
export default Weather;
