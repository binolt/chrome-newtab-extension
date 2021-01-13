import React from 'react';
import {useAuth} from "./menu"
import { CSSTransition } from 'react-transition-group';


//ICONS
import {ReactComponent as ChevronLeft} from "../icons/settings/chevron_left-black-48dp.svg"


const SideMenu = (props) => {
    const { handlePrevMenu, currentMenu } = useAuth();
    const {title, children} = props;
    return (
        <CSSTransition in={currentMenu === title} unmountOnExit timeout={200} classNames="menu-transition">
        <div className="menu-side">
            <section className="menu-side-header">
                <ChevronLeft onClick={handlePrevMenu}/>
                <h1>{title}</h1>
            </section>
            <hr/>
            <section className="menu-side-body">
                {children}
            </section>
        </div>
        </CSSTransition>
    )
}
 
export default SideMenu;