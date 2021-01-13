import React from 'react';
import {useAuth} from "./menu"


//ICONS
import {ReactComponent as ChevronLeft} from "../icons/settings/chevron_left-black-48dp.svg"


const SideMenu = (props) => {
    const { handlePrevMenu } = useAuth();
    return (
        <div className="menu-side">
            <section className="menu-side-header">
                <ChevronLeft onClick={handlePrevMenu}/>
                <h1>{props.title}</h1>
            </section>
            <hr/>
            <section className="menu-side-body">
                {props.children}
            </section>
        </div>
    )
}
 
export default SideMenu;