import React, { useEffect, useState } from 'react';
import {CSSTransition} from "react-transition-group";
import { createApi } from 'unsplash-js';

import {ReactComponent as ProfileIcon} from "../icons/settings/people_alt-black-48dp.svg"
import {ReactComponent as DarkmodeIcon} from "../icons/settings/dark_mode-black-48dp.svg"
import {ReactComponent as ImageIcon} from "../icons/settings/image-black-48dp.svg"
import {ReactComponent as TodoIcon} from "../icons/settings/layers-black-48dp.svg"
import {ReactComponent as ToggleIcon} from "../icons/settings/toggle_on-black-48dp.svg"
import {ReactComponent as QuotesIcon} from "../icons/settings/wb_twilight-black-48dp.svg"
// import {ReactComponent as ChevronLeft} from "../icons/settings/chevron_left-black-48dp.svg"
// import {ReactComponent as Heart} from "../icons/settings/heart.svg"


const unsplash = createApi({
    accessKey: 'oymaM_SVwaKMAPAb0Frcs3OiuMC2_cTuh47uKkin0kE',
    headers: { 'X-Custom-Header': 'foo' },
  });

const Menu = (props) => {
    const [currentMenu, setCurrentMenu] = useState("main")
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true)
    }, [])

    const updateMenu = (targetMenu) => {
        setCurrentMenu(targetMenu)
    }

    return ( 
        <div className="menu" style={{backdropFilter: loaded ? "blur(4px) opacity(1)" : "blur(4px) opacity(0)"}}>
            <CSSTransition in={currentMenu === "main"} unmountOnExit>
                <MainMenu updateMenu={updateMenu}/>
            </CSSTransition>
            <CSSTransition in={currentMenu === "background"} unmountOnExit>
                <BackgroundMenu updateMenu={updateMenu} changeImage={props.changeImage}/>
            </CSSTransition>
        </div>  
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
            <MenuItem icon={<ProfileIcon/>} title="Profile" desc="Edit your profile"/>
            <MenuItem icon={<ImageIcon/>} title="Background" desc="Set your own custom background"/>
            <MenuItem icon={<QuotesIcon/>} title="Quotes" desc="Spark creativity and passion with uplifing quotes!"/>
            <MenuItem icon={<TodoIcon/>} title="Todo List" desc="Keep on top of your daily tasks"/>
            <MenuItem icon={<DarkmodeIcon/>} toggle title="Dark Mode" desc="For the lightmode weirdos out there :)"/>
            <section className="menu-footer"/>
        </div>
    )
}

const MenuItem = (props) => {
    const {icon, title, desc, toggle} = props;
    return (
        <div className="menu-main-item">
        {icon}
        <span>
            <h3>{title}</h3>
            <p>{desc}</p>
        </span>
        {toggle && <ToggleIcon className="menu-main-item-toggle"/>}
    </div>
    )
}

const BackgroundMenu = (props) => {
    const [images, setImages] = useState([])
    useEffect(() => {
        unsplash.search.getPhotos({
            query: 'beach',
            perPage: 10,
            orientation: 'landscape',
          }).then(data => {
            let imgs = []
            data.response.results.forEach((img => {
              imgs.push(img.urls.full)
            }))
            setImages(imgs)
          })
    }, [])
    return (
        <div>
            <h1>Background</h1>
            {images.map(((image, index) => {
            return <img onClick={() => props.changeImage(image)} key={image} src={image} alt={`cat-${index}`}/>
            }))}
        </div>
    )
}