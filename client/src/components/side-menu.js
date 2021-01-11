import React from 'react';

//ICONS
import {ReactComponent as ChevronLeft} from "../icons/settings/chevron_left-black-48dp.svg"


const SideMenu = (props) => {
    return (
        <div>
            <section className="menu-side-header">
                <ChevronLeft onClick={() => props.updateMenu("main")}/>
                <h1>{props.title}</h1>
            </section>
            <hr/>
            {props.children}
        </div>
    )
}
 
export default SideMenu;