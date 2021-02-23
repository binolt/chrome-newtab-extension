import {ReactComponent as ImageIcon} from "../../icons/settings/image-black-48dp.svg";
import {ReactComponent as ProfileIcon} from "../../icons/settings/people_alt-black-48dp.svg";
import {ReactComponent as WeatherIcon} from "../../icons/settings/wb_twilight-black-48dp.svg";
import {ReactComponent as ClockIcon} from "../../icons/settings/access_time-black-48dp.svg";
import {ReactComponent as TodoIcon} from "../../icons/settings/layers-black-48dp.svg";
import {ReactComponent as QuotesIcon} from "../../icons/settings/lightbulb-black-48dp.svg";
import {ReactComponent as SettingsIcon} from "../../icons/settings/settings-black-48dp.svg";

export const optionsData = [
    {header: "Main", title: "Main"},
    {title: "Background Image", icon: <ImageIcon/>},
    {title: "Profile", icon: <ProfileIcon/>},
    {title: "Settings", icon: <SettingsIcon/>},
    {header: "Widgets", title: "Widgets"},
    {title: "Weather", icon: <WeatherIcon/>},
    {title: "Clock", icon: <ClockIcon/>},
    {title: "To-do List", icon: <TodoIcon/>},
    {title: "Quotes", icon: <QuotesIcon/>},
]


export const backgroundMenuData = [
    {title: "Featured", desc: "View featured backgrounds to make your homepage pop", img: "https://images.unsplash.com/photo-1611465577672-8fc7be1dc826?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"},
    {title: "Upload", desc: "Upload your own custom images", img: "https://images.unsplash.com/photo-1518965539400-77d851d65c43?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=633&q=80"},
    {title: "Favorited", desc: "View all of your favorited backgrounds", img: "https://images.unsplash.com/photo-1517191434949-5e90cd67d2b6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80"},
    {title: "Unsplash", desc: "Browse the Unsplash library for high-quality backgrounds", img: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80"},
]