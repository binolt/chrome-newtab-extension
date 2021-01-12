import React from 'react';
import {ReactComponent as ToggleIcon} from "../icons/settings/toggle_on-black-48dp.svg"
import {useAuth} from "./menu"


const MenuItem = (props) => {
    const {icon, title, desc, toggle} = props;
    const { updateMenu } = useAuth();
    return (
        <div className="menu-main-item" onClick={() => updateMenu(title)}>
        {icon}
        <span>
            <h3>{title}</h3>
            <p>{desc}</p>
        </span>
        {toggle && <ToggleIcon className="menu-main-item-toggle"/>}
    </div>
    )
}
 
export default MenuItem;