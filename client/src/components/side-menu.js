import React from 'react';
import {useAuth} from "./menu"


//ICONS
import {ReactComponent as ChevronLeft} from "../icons/settings/chevron_left-black-48dp.svg"


const SideMenu = (props) => {
    const { handlePrevMenu, currentMenu } = useAuth();
    const {title, children} = props;
    return currentMenu === title && (
        <div className="menu-side">
            <section className="menu-side-header">
                <span>
                <ChevronLeft onClick={handlePrevMenu}/>
                <h1>{title}</h1>
                </span>
                <hr/>
            </section>
            <section className="menu-side-body">
                {children}
            </section>
        </div>
    )
}
 
export default SideMenu;