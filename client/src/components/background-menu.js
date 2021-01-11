import React, { useEffect } from 'react';
import {useAuth} from "./menu"

const BackgroundMenu = () => {
    const { currentMenu, previousMenu } = useAuth();
    useEffect(() => {
        console.log(currentMenu)
        console.log(previousMenu)
    }, [])
    return ( 
        <div>
            <h1>Background Menu</h1>
        </div>
     );
}
 
export default BackgroundMenu;