import React, { useEffect, useState } from 'react';
import Moment from "react-moment";
import { useAuth } from '../../context/WidgetContext';

//ICONS
import {ReactComponent as SunnyIcon} from "../../icons/weather/wb_sunny-black-24dp.svg"


const Weather = () => {
    const {weatherToggled, setLocationDisabled} = useAuth();
    const [weatherData, setWeatherData] = useState(null);
    const date = new Date()


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
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location.city}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=imperial`)
        .then(res => res.json())
        .then(data => {
            formatData(data)
        })
    }


    const formatData = (data) => {
        console.log(data)
        const desc = capitalizeFirstLetter(data.weather[0].description);
        const temp = Math.trunc(data.main.temp);
        const city = data.name;
        const icon = data.weather[0].icon;
        const formattedData = {
            description: desc,
            temperature: temp,
            city: city,
            icon: icon
        }
        setWeatherData(formattedData)
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
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
    
    const getCity = async(position) => {
        return new Promise(function(resolve) {
            // check local storage for stored city
            const localWeatherData = JSON.parse(localStorage.getItem("weather"));
            if(localWeatherData.coords && localWeatherData.city) {
                //if user hasn't changed their location
                if(localWeatherData.coords.longitude === position.longitude && localWeatherData.coords.latitude === position.latitude) {
                    resolve({city: localWeatherData.city});
                    return;
                }
            }
            // if no local storage data, fetch city from api
            fetch(`https://us1.locationiq.com/v1/reverse.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&lat=${position.latitude}&lon=${position.longitude}&format=json`)
            .then((res => res.json()))
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

    return weatherData && weatherToggled && ( 
        <div className="content-weather">
            <img src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}/>
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