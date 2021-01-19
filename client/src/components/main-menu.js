import React from 'react';
import MenuItem from "./menu-item";
import {useAuth} from "./menu"


import {ReactComponent as ProfileIcon} from "../icons/settings/people_alt-black-48dp.svg"
import {ReactComponent as DarkmodeIcon} from "../icons/settings/dark_mode-black-48dp.svg"
import {ReactComponent as ImageIcon} from "../icons/settings/image-black-48dp.svg"
import {ReactComponent as QuotesIcon} from "../icons/settings/wb_twilight-black-48dp.svg"

const MainMenu = () => {
    const { currentMenu } = useAuth();
    return currentMenu === "main" && (
        <div className="menu-main">
            <section className="menu-header">
                <h1>Settings</h1>
            </section>
            <hr/>
            <MenuItem icon={<ProfileIcon/>} title="Profile" desc="Edit your profile"/>
            <MenuItem icon={<ImageIcon/>} title="Background" desc="Set your own custom background"/>
            <MenuItem icon={<QuotesIcon/>} title="Widgets" desc="Add functionality to your home page"/>
            <MenuItem icon={<DarkmodeIcon/>} toggle title="Dark Mode" desc="For the lightmode weirdos out there :)"/>
        </div>
    )
}
 
export default MainMenu;