import React, { useEffect, useState } from 'react';
import Toggle from "react-toggle";
import "react-toggle/style.css"

const WeatherMenu = () => {
    const [isToggled, setIsToggled] = useState(false);
    const handleChange = () => {
        setIsToggled(!isToggled)
    }

    useEffect(() => {
        console.log("here")
    }, [])
    return ( 
        <div>
            <h1>Hello</h1>
            <Toggle onChange={handleChange} checked={isToggled}/>
        </div>
     );
}
 
export default WeatherMenu;