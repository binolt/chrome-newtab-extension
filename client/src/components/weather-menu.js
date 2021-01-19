import React from 'react';
import Toggle from "react-toggle";
import "react-toggle/style.css"
import { useAuth } from '../context/WidgetContext';

const WeatherMenu = () => {
    const {weatherToggled, setWeatherToggled, locationDisabled} = useAuth();

    const handleChange = () => {
        const localWeatherData = JSON.parse(localStorage.getItem("weather"));

        if(!weatherToggled) {
            setWeatherToggled(true)
            const updatedWeatherData = {
                ...localWeatherData,
                weatherServices: true
            }
            localStorage.setItem("weather", JSON.stringify(updatedWeatherData));
            return;
        }

        setWeatherToggled(false)
        const updatedWeatherData = {
            ...localWeatherData,
            weatherServices: false
        }
        localStorage.setItem("weather", JSON.stringify(updatedWeatherData));
        
    }


    return ( 
        <div>
            <h1>Hello</h1>
            <Toggle onChange={handleChange} checked={weatherToggled}/>
            {locationDisabled && weatherToggled && <p>You need to turn on your location services. Click <a rel="noreferrer" target="_blank" href="https://support.google.com/chrome/answer/142065?hl=en">here</a> for a guide :)</p>}
        </div>
     );
}
 
export default WeatherMenu;