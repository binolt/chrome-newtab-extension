import React from 'react';
import { useGlobalAuth } from '../../context/global-context';
import ImageItem from "../image-item";




const FavoritedMenu = () => {
    const {favorited} = useGlobalAuth();
    return ( 
        <div className="menu-background-featured-wrapper">
        <div className="menu-background-featured">
            {favorited.map((img) => {
                return <ImageItem key={`card-${img.id}`} {...img}/>
            })}
        </div>
        </div>
     );
}

 
export default FavoritedMenu;