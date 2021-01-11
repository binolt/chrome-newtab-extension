import React, { useEffect, useState, useContext } from 'react';
import {CSSTransition} from "react-transition-group";
import { createApi } from 'unsplash-js';

import {ReactComponent as ProfileIcon} from "../icons/settings/people_alt-black-48dp.svg"
import {ReactComponent as DarkmodeIcon} from "../icons/settings/dark_mode-black-48dp.svg"
import {ReactComponent as ImageIcon} from "../icons/settings/image-black-48dp.svg"
import {ReactComponent as TodoIcon} from "../icons/settings/layers-black-48dp.svg"
import {ReactComponent as ToggleIcon} from "../icons/settings/toggle_on-black-48dp.svg"
import {ReactComponent as QuotesIcon} from "../icons/settings/wb_twilight-black-48dp.svg"
// import {ReactComponent as Heart} from "../icons/settings/heart.svg"
import BackgroundMenu from "./background-menu"
import SideMenu from "./side-menu"

export const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
  }

const unsplash = createApi({
    accessKey: 'oymaM_SVwaKMAPAb0Frcs3OiuMC2_cTuh47uKkin0kE',
    headers: { 'X-Custom-Header': 'foo' },
  });

const Menu = (props) => {
    const [currentMenu, setCurrentMenu] = useState("main")
    const [loaded, setLoaded] = useState(false);
    const [previousMenu, setPreviousMenu] = useState("");

    useEffect(() => {
        setLoaded(true)
    }, [])

    const updateMenu = (targetMenu) => {
        setPreviousMenu(currentMenu);
        setCurrentMenu(targetMenu)
    }

    const value = {
        currentMenu,
        previousMenu
    }

    return ( 
        <AuthContext.Provider value={value}>
        <div className="menu" style={{backdropFilter: loaded ? "blur(4px) opacity(1)" : "blur(4px) opacity(0)"}}>
            <CSSTransition in={currentMenu === "main"} unmountOnExit>
                <MainMenu updateMenu={updateMenu}/>
            </CSSTransition>
            {/* BACKGROUND MENUS */}
                <CSSTransition in={currentMenu === "Background"} unmountOnExit>
                    <SideMenu updateMenu={updateMenu} title="Background">
                        <MenuItem {...props} updateMenu={updateMenu} icon={<ProfileIcon/>} title="Unsplash" desc="Browse the Unsplash library"/>
                        <MenuItem {...props} icon={<ImageIcon/>} title="Upload" desc="Use your own custom image"/> 
                    </SideMenu>
                </CSSTransition>
                <CSSTransition in={currentMenu === "Unsplash"} unmountOnExit>
                    <SideMenu updateMenu={updateMenu} title="Unsplash">
                        <BackgroundMenu {...props}/>
                    </SideMenu>
                </CSSTransition>
            {/* PROFILE MENUS */}
            <CSSTransition in={currentMenu === "Profile"} unmountOnExit>
                <SideMenu updateMenu={updateMenu} title="Profile"/>
            </CSSTransition>
            <CSSTransition in={currentMenu === "Quotes"} unmountOnExit>
                <SideMenu updateMenu={updateMenu} title="Quotes"/>
            </CSSTransition>
            <CSSTransition in={currentMenu === "Todo List"} unmountOnExit>
                <SideMenu updateMenu={updateMenu} title="Todo List"/>
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

// const SideMenu = (props) => {
//     return (
//         <div>
//             <section className="menu-side-header">
//                 <ChevronLeft onClick={() => props.updateMenu("main")}/>
//                 <h1>{props.title}</h1>
//             </section>
//             <hr/>
//             {props.children}
//         </div>
//     )
// }

const MenuItem = (props) => {
    const {icon, title, desc, toggle} = props;
    return (
        <div className="menu-main-item" onClick={() => props.updateMenu(title)}>
        {icon}
        <span>
            <h3>{title}</h3>
            <p>{desc}</p>
        </span>
        {toggle && <ToggleIcon className="menu-main-item-toggle"/>}
    </div>
    )
}

// const BackgroundMenu = (props) => {
//     const [images, setImages] = useState([])
//     useEffect(() => {
//         unsplash.search.getPhotos({
//             query: 'beach',
//             perPage: 10,
//             orientation: 'landscape',
//           }).then(data => {
//             let imgs = []
//             data.response.results.forEach((img => {
//               imgs.push(img.urls.full)
//             }))
//             setImages(imgs)
//           })
//     }, [])
//     return (
//         <div>
//             {images.map(((image, index) => {
//             return <img onClick={() => props.changeImage(image)} key={image} src={image} alt={`cat-${index}`}/>
//             }))}
//         </div>
//     )
// }