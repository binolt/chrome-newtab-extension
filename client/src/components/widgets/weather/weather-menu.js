import React from 'react';
import Toggle from "react-toggle";
import "react-toggle/style.css"
import { useGlobalAuth } from '../../../context/global-context';
import {useAuth} from "../../../context/menu-context";

const WeatherMenu = () => {
    //global auth
    const {weatherToggled, setWeatherToggled, locationDenied} = useGlobalAuth()
    //menu auth
    const {menu} = useAuth()

    const handleChange = () => {
        //if weather is turned off (turn on)
        if(!weatherToggled) {
            setWeatherToggled(true)
            updateLocalStorage(true);
            return;
        }
        //if weather is turned on (turn off)
        setWeatherToggled(false)
        updateLocalStorage(false);
    }

    const updateLocalStorage = (bool) => {
        const localWeatherData = JSON.parse(localStorage.getItem("weather"));

        const updatedWeatherData = {
            ...localWeatherData,
            enabled: bool
        }
        localStorage.setItem("weather", JSON.stringify(updatedWeatherData));
    }


    return menu === "Weather" && ( 
        <div>
            <span style={{display: "flex"}}>
            <p>Enable Weather Services</p>
            <Toggle onChange={handleChange} checked={weatherToggled}/>
            </span>
            {locationDenied && weatherToggled && <p>You need to turn on your location services. Click <a rel="noreferrer" target="_blank" href="https://support.google.com/chrome/answer/142065?hl=en">here</a> for a guide :)</p>}
        </div>
     );
}
 
export default WeatherMenu;