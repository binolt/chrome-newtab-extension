import React, { useEffect, useState } from 'react';
import {useAuth} from "../../context/menu-context";


//icons
import {ReactComponent as ImageIcon} from "../../icons/settings/image-black-48dp.svg";
import {ReactComponent as ProfileIcon} from "../../icons/settings/people_alt-black-48dp.svg";
import {ReactComponent as WeatherIcon} from "../../icons/settings/wb_twilight-black-48dp.svg";
import {ReactComponent as ClockIcon} from "../../icons/settings/access_time-black-48dp.svg";
import {ReactComponent as TodoIcon} from "../../icons/settings/layers-black-48dp.svg";
import {ReactComponent as QuotesIcon} from "../../icons/settings/lightbulb-black-48dp.svg";
import {ReactComponent as SettingsIcon} from "../../icons/settings/settings-black-48dp.svg";
import {ReactComponent as ChevronLeft} from "../../icons/chevron_left-black-48dp.svg";

import bg from "../../images/VYOsxOY.jpg";
import FeaturedBackgrounds from '../background-menus/featured-backgrounds';
import UploadMenu from '../background-menus/upload-menu';

const optionsData = [
    {header: "Main", title: "Main"},
    {title: "Background Image", icon: <ImageIcon/>},
    {title: "Profile", icon: <ProfileIcon/>},
    {title: "Settings", icon: <SettingsIcon/>},
    {header: "Widgets", title: "Widgets"},
    {title: "Weather", icon: <WeatherIcon/>},
    {title: "Clock", icon: <ClockIcon/>},
    {title: "To-do List", icon: <TodoIcon/>},
    {title: "Quotes", icon: <QuotesIcon/>},
]


const backgroundMenuData = [
    {title: "Featured", desc: "View featured backgrounds to make your homepage pop", img: "https://images.unsplash.com/photo-1611465577672-8fc7be1dc826?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"},
    {title: "Upload", desc: "Upload your own custom images", img: "https://images.unsplash.com/photo-1518965539400-77d851d65c43?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=633&q=80"},
    {title: "Favorited", desc: "View all of your favorited backgrounds", img: "https://images.unsplash.com/photo-1517191434949-5e90cd67d2b6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80"},
    {title: "Unsplash", desc: "Browse the Unsplash library for high-quality backgrounds", img: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80"},
]

const Menu = () => {
    return ( 
        <div className="menu">
            <div className="menu-header">
            <h1>Customize Dashboard</h1>
            </div>
            <div className="menu-body">
                <div className="menu-body-options">
                    <hr/>
                    <div className="menu-body-options-list">
                    {optionsData.map((data) => {
                        return <MenuItem key={data.title} {...data}/>
                    })}
                    </div>
                </div>
                <div className="menu-body-content">
                    <ProfileMenu/>
                    <BackgroundMenu/>
                </div>
            </div>
        </div>
     );
}

const MenuItem = ({title, icon, header}) => {
    const {menu, setMenu} = useAuth();

    const handleClick = () => {
        setMenu(title)
    }

    if(header) {
        return <p style={{marginTop: header === "Widgets" && "1rem"}} className="menu-body-options-head">{header}</p>
    }

    return (
        <div className={menu === title ? `menu-item menu-item-selected` : "menu-item"} onClick={handleClick}>
            {icon}
            <p>{title}</p>
            <div className={menu === title ? `menu-item-highlight menu-item-highlight-placeholder` : "menu-item-highlight-placeholder"}/>
        </div>
    )
}

const ProfileMenu = () => {
    const {menu} = useAuth();
    return menu === "Profile" && (
        <div className="menu-body-profile">
        <div className="menu-body-profile-header">
            <div style={{backgroundImage: `url(${bg})`}}/>
            <span>
                <h6>Steven</h6>
                <p>luongosteven@gmail.com</p>
            </span>
        </div>
        <hr/>
        <section className="menu-body-profile-content">
            <div className="menu-body-profile-left">
                <p>About</p>
                <textarea rows="3" type="text" placeholder="Write a note..."/>
                <span>
                    <button>Upgrade</button>
                    <button>Edit</button>
                </span>
            </div>
            <div className="menu-body-profile-right">
                <span>
                <h4>2.8K</h4>
                <p>Consecutive Days</p>
                </span>
                <span>
                <h4>3.2K</h4>
                <p>Tabs Opened</p>
                </span>
                <span>
                <h4>8.4K</h4>
                <p>Quotes Generated</p>
                </span>
            </div>
        </section>
    </div>
    )
}

const BackgroundMenu = () => {
    const {menu, backgroundMenu} = useAuth();
    return menu === "Background Image" && (
        <div className="menu-background">
            {backgroundMenu === "Main" && backgroundMenuData.map((data) => {
                return <BackgroundMenuCard key={`card-${data.title}`} {...data}/>
            })}
            <SideBackgroundMenu title="Featured">
                <FeaturedBackgrounds/>
            </SideBackgroundMenu>
            <SideBackgroundMenu title="Upload">
                <UploadMenu/>
            </SideBackgroundMenu>
            <SideBackgroundMenu title="Favorited">
            </SideBackgroundMenu>
            <SideBackgroundMenu title="Unsplash">
            </SideBackgroundMenu>
        </div>
    )
}

const BackgroundMenuCard = ({img, title, desc}) => {
    const {setBackgroundMenu} = useAuth();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const preload = () => {
            let image = new Image();
            image.src = img;
            image.onload = function () {
                setLoaded(true)
            }
        }
        preload()
    }, [img])
    return (
        <div onClick={() => setBackgroundMenu(title)} className="menu-background-card" style={{backgroundImage: `url(${img})`, opacity: loaded ? 1 : 0}}>
        <h6>{title}</h6>
        <p>{desc}</p>
    </div>
    )
}

const SideBackgroundMenu = ({children, title}) => {
    const {backgroundMenu, setBackgroundMenu} = useAuth();

    return backgroundMenu === title && (
        <div className="menu-background-side">
        <span className="menu-background-side-header">
        <ChevronLeft onClick={() => setBackgroundMenu("Main")}/>
        <p>{title}</p>
        </span>
            {children}
        </div>
    )
}
 
export default Menu;