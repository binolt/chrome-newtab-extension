import React, { useEffect, useState, useContext, useRef } from 'react';
import SideMenu from "./side-menu"
import UnsplashMenu from './background-menus/unsplash-menu';
import MenuItem from "./menu-item";
import "../css/menu/menu.css"
import MainMenu from "./main-menu";

import {ReactComponent as ProfileIcon} from "../icons/settings/people_alt-black-48dp.svg"
import {ReactComponent as ImageIcon} from "../icons/settings/image-black-48dp.svg"

export const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
  }


const Menu = (props) => {
    const [currentMenu, setCurrentMenu] = useState("main")
    const [loaded, setLoaded] = useState(false);
    const [previousMenus, setPreviousMenus] = useState([]);
    const nodeRef = useRef(null);

    useEffect(() => {
        setLoaded(true)
        getWeather();
    }, [])

    const getWeather = async() => {
        const city = await fetchLocation()
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`)
        .then(res => res.json())
        .then(data => console.log(data))
    }

    const fetchLocation = async () => {
        const coords = await getCoords()
        return await getCity(coords);
    }

    const getCoords = async() => {
        return new Promise(function(resolve, reject) {
            navigator.geolocation.getCurrentPosition(function(position) {
                if(position) {
                    resolve(position.coords)
                }
            })
        })
    }

    const getCity = async(position) => {
        return new Promise(function(resolve, reject) {
            fetch(`https://us1.locationiq.com/v1/reverse.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&lat=${position.latitude}&lon=${position.longitude}&format=json`)
            .then((res => res.json()))
            .then(data => resolve(data.address.city))
        })
    }

    const updateMenu = (targetMenu) => {
        const prevMenus = previousMenus;
        prevMenus.push(currentMenu);

        setPreviousMenus(prevMenus);
        setCurrentMenu(targetMenu)
    }

    const handlePrevMenu = () => {
        const prevMenus = previousMenus;
        const lastMenu = prevMenus.pop();
        setCurrentMenu(lastMenu)
        setPreviousMenus(prevMenus)
    }

    const value = {
        currentMenu,
        previousMenus,
        updateMenu,
        handlePrevMenu
    }

    return ( 
        <AuthContext.Provider value={value}>
            <div ref={nodeRef} className="menu" style={{backdropFilter: loaded ? "blur(4px) opacity(1)" : "blur(4px) opacity(0)"}}>
                    
                <MainMenu/>
                {/* BACKGROUND MENUS */}
                <SideMenu title="Background">
                    <MenuItem {...props} icon={<ProfileIcon/>} title="Unsplash" desc="Browse the Unsplash library"/>
                    <MenuItem {...props} icon={<ImageIcon/>} title="Upload" desc="Use your own custom image"/> 
                </SideMenu>
                <SideMenu title="Unsplash">
                    <UnsplashMenu {...props}/>
                </SideMenu>
                {/* PROFILE MENUS */}
                {/* <SideMenu title="Profile"/>
                <SideMenu title="Widgets"/> */}
            </div>  
        </AuthContext.Provider>
     );
}
 
export default Menu;

