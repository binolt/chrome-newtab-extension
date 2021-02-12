import React, { useEffect, useState } from 'react';
import { useGlobalAuth } from '../../../context/global-context';
import weatherService from "../../../services/weather-service";
import WeatherIcon from './weather-icon';

//ICONS


const Weather = () => {
    const {weatherToggled, setLocationDenied} = useGlobalAuth();
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
        const data = await weatherService.fetchWeather(location);
        formatData(data)
    }

    const fetchLocation = async () => {
        return new Promise(async function(resolve) {
            const data = await getCoords()
            //if user has location services blocked
            if(data.denied) {
                updateLocalStorage("denied", true)
                setLocationDenied(true);
                return data;
            }
            // set cords in local storage
            updateLocalStorage("coords", data);
            resolve(data)
        })
    }
    
    const getCoords = async() => {
        return new Promise(function(resolve) {
            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    //set location enabled in LS
                    updateLocalStorage("denied", false)
                    setLocationDenied(false);
                    //resolve promise w/ coords
                    resolve({longitude: position.coords.longitude, latitude: position.coords.latitude});
                // ERROR HANDLING
                }, function(error) {
                    const data = handleGeolocationError(error);
                    resolve(data);
                })
            } else {
                console.log("Your browser does not support geolocation services.")
            }

        })
    }

    const handleGeolocationError = (err) => {
        switch(err.code) {
            case err.PERMISSION_DENIED:
                return {denied: true, error: err}
            case err.POSITION_UNAVAILABLE:
                return {unavailable: true, error: err}
            case err.TIMEOUT:
                return {timeout: true, error: err}
            case err.UNKNOWN_ERROR:
                return {unknown: true, error: err}
            default:
                return err;
          }
    }

    const formatData = (data) => {
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

    const updateLocalStorage = (item, data) => {
        const localWeatherData = JSON.parse(localStorage.getItem("weather"));
        const updatedWeatherData = {
            ...localWeatherData,
            [item]: data
        }
        localStorage.setItem("weather", JSON.stringify(updatedWeatherData));
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
        </div>
     );
}
 
export default Weather;
