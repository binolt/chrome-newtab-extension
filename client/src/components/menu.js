import React, { useEffect, useState, useContext } from 'react';
import SideMenu from "./side-menu"
import UnsplashMenu from './background-menus/unsplash-menu';
import MenuItem from "./menu-item";
import {CSSTransition} from "react-transition-group";

import {ReactComponent as ProfileIcon} from "../icons/settings/people_alt-black-48dp.svg"
import {ReactComponent as DarkmodeIcon} from "../icons/settings/dark_mode-black-48dp.svg"
import {ReactComponent as ImageIcon} from "../icons/settings/image-black-48dp.svg"
import {ReactComponent as TodoIcon} from "../icons/settings/layers-black-48dp.svg"
import {ReactComponent as QuotesIcon} from "../icons/settings/wb_twilight-black-48dp.svg"
// import {ReactComponent as Heart} from "../icons/settings/heart.svg"

export const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
  }


const Menu = (props) => {
    const [currentMenu, setCurrentMenu] = useState("main")
    const [loaded, setLoaded] = useState(false);
    const [previousMenus, setPreviousMenus] = useState([]);

    useEffect(() => {
        setLoaded(true)
    }, [])

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
        <div className="menu" style={{backdropFilter: loaded ? "blur(4px) opacity(1)" : "blur(4px) opacity(0)"}}>
            <CSSTransition in={currentMenu === "main"} unmountOnExit>
                <MainMenu/>
            </CSSTransition>
            {/* BACKGROUND MENUS */}
            <CSSTransition in={currentMenu === "Background"} unmountOnExit>
                <SideMenu title="Background">
                    <MenuItem {...props} icon={<ProfileIcon/>} title="Unsplash" desc="Browse the Unsplash library"/>
                    <MenuItem {...props} icon={<ImageIcon/>} title="Upload" desc="Use your own custom image"/> 
                </SideMenu>
            </CSSTransition>
            <CSSTransition in={currentMenu === "Unsplash"} unmountOnExit>
                <SideMenu title="Unsplash">
                    <UnsplashMenu {...props}/>
                </SideMenu>
            </CSSTransition>
            {/* PROFILE MENUS */}
            <CSSTransition in={currentMenu === "Profile"} unmountOnExit>
                <SideMenu title="Profile"/>
            </CSSTransition>
            <CSSTransition in={currentMenu === "Quotes"} unmountOnExit>
                <SideMenu title="Quotes"/>
            </CSSTransition>
            <CSSTransition in={currentMenu === "Todo List"} unmountOnExit>
                <SideMenu title="Todo List"/>
            </CSSTransition>
        </div>  
        </AuthContext.Provider>
     );
}
 
export default Menu;

const MainMenu = (props) => {
    return (
        <div>
            <section className="menu-header">
                <h1>Settings</h1>
            </section>
            <hr/>
            <MenuItem {...props} icon={<ProfileIcon/>} title="Profile" desc="Edit your profile"/>
            <MenuItem {...props} icon={<ImageIcon/>} title="Background" desc="Set your own custom background"/>
            <MenuItem {...props} icon={<QuotesIcon/>} title="Quotes" desc="Spark creativity and passion with uplifing quotes!"/>
            <MenuItem {...props} icon={<TodoIcon/>} title="Todo List" desc="Keep on top of your daily tasks"/>
            <MenuItem {...props} icon={<DarkmodeIcon/>} toggle title="Dark Mode" desc="For the lightmode weirdos out there :)"/>
        </div>
    )
}
