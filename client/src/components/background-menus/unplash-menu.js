import React, { useEffect, useState } from 'react';
import {unsplash} from "../../unsplash-config";
import ImageItem from "../image-item";

import {ReactComponent as SearchIcon} from "../../icons/search-black-24dp.svg";


const UnsplashMenu = () => {
    const [images, setImages] = useState([])
    useEffect(() => {
        const test = async ( ) => {
            const data = await unsplash.collections.getPhotos({
              collectionId: 11624136,
              perPage: 20
            })
            setImages(data.response.results);
          }
          test()
    }, [])
    return ( 
        <div className="m-unsplash-wrap">
            <div className="m-unsplash-search">
                <input type="text" placeholder="Search"/>
                <div>
                    <SearchIcon/>
                </div>
            </div>
            <div className="m-unsplash-cg">
                <UnsplashCategory title="Wallpapers"/>
                <UnsplashCategory title="Beach"/>
                <UnsplashCategory title="Nature"/>
                <UnsplashCategory title="Mountains"/>
                <UnsplashCategory title="Snow"/>
                <UnsplashCategory title="Animals"/> 
            </div>
        <div className="m-unsplash-query-wrap">
        <div className="m-unsplash-query">
           {images && images.map((img) => {
               return <ImageItem key={`card-${img.id}`} {...img}/>
           })}
        </div>
        </div>

            
        </div>
     );
}

const UnsplashCategory = ({title}) => {
    return (
        <span>
            <p>{title}</p>
        </span>
    )
}
 
export default UnsplashMenu;