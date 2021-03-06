import React, { useEffect, useState } from 'react';
import {useAuth} from "../../context/menu-context";
import {optionsData, backgroundMenuData} from "./menu-data";
import bg from "../../images/VYOsxOY.jpg";
import FeaturedBackgrounds from '../background-menus/featured-menu';
import UploadMenu from '../background-menus/upload-menu';
import WeatherMenu from '../widgets/weather/weather-menu';
import FavoritedMenu from '../background-menus/favorited-menu';
import UnsplashMenu from '../background-menus/unplash-menu';
import TodoListMenu from '../widgets/todo-list/todo-list-menu';
import QuoteMenu from '../widgets/quotes/quote-menu';

//ICONS
import {ReactComponent as ChevronLeft} from "../../icons/chevron_left-black-48dp.svg";

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
                        <RenderOptions/>
                    </div>
                </div>
                <div className="menu-body-content">
                    {/* MAIN MENUS */}
                    <ProfileMenu/>
                    <BackgroundMenu/>
                    {/* WIDGET MENUS */}
                    <WeatherMenu/>
                    <TodoListMenu/>
                    <QuoteMenu/>
                </div>
            </div>
        </div>
     );
}

const RenderOptions = () => {
    const options = optionsData.map((data) => {
        return <MenuItem key={data.title} {...data}/>
    })
    return options;
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
                <FavoritedMenu/>
            </SideBackgroundMenu>
            <SideBackgroundMenu title="Unsplash">
                <UnsplashMenu/>
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