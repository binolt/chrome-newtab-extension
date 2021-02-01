import React, { useEffect } from 'react';
import {useAuth} from "../../context/menu-context";


//icons
import {ReactComponent as ImageIcon} from "../../icons/settings/image-black-48dp.svg";
import {ReactComponent as ProfileIcon} from "../../icons/settings/people_alt-black-48dp.svg";
import {ReactComponent as WeatherIcon} from "../../icons/settings/wb_twilight-black-48dp.svg";
import {ReactComponent as ClockIcon} from "../../icons/settings/access_time-black-48dp.svg";
import {ReactComponent as TodoIcon} from "../../icons/settings/layers-black-48dp.svg";
import {ReactComponent as QuotesIcon} from "../../icons/settings/lightbulb-black-48dp.svg";
import {ReactComponent as SettingsIcon} from "../../icons/settings/settings-black-48dp.svg";

const Menu = () => {
    const {menu, setMenu} = useAuth();


    return ( 
        <div className="menu">
            <div className="menu-header">
            <h1>Customize Dashboard</h1>
            </div>
            <div className="menu-body">
                <div className="menu-body-options">
                    <MenuItem title="Profile" icon={<ProfileIcon/>}/>
                    <MenuItem title="Background Image" icon={<ImageIcon/>}/>
                    <MenuItem title="Weather" icon={<WeatherIcon/>}/>
                    <MenuItem title="Clock" icon={<ClockIcon/>} />
                    <MenuItem title="To-do List" icon={<TodoIcon/>}/>
                    <MenuItem title="Quotes" icon={<QuotesIcon/>} />
                    <MenuItem title="Settings" icon={<SettingsIcon/>} />
                </div>
                <div className="menu-body-content">
                </div>
            </div>
        </div>
     );
}

const MenuItem = ({title, icon}) => {
    const {menu, setMenu} = useAuth();

    const handleClick = () => {
        setMenu(title)
    }


    return (
        <div className={menu === title ? `menu-item menu-item-selected` : "menu-item"} onClick={handleClick}>
            {icon}
            <p>{title}</p>
            <div className={menu === title ? `menu-item-highlight menu-item-highlight-placeholder` : "menu-item-highlight-placeholder"}/>
        </div>
    )
}
 
export default Menu;