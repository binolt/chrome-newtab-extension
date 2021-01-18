import React from 'react';
import {useAuth} from "./menu"



const MenuItem = (props) => {
    const {icon, title, desc} = props;
    const { updateMenu } = useAuth();
    return (
        <div className="menu-main-item" onClick={() => updateMenu(title)}>
        {icon}
        <span>
            <h3>{title}</h3>
            <p>{desc}</p>
        </span>
    </div>
    )
}
 
export default MenuItem;