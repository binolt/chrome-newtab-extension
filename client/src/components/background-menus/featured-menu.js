import React, {useEffect, useState} from 'react';
import { useAuth } from '../../context/menu-context';
import {unsplash} from "../../unsplash-config";
import ImageItem from "../image-item";





const FeaturedBackgrounds = () => {
    const {backgroundMenu} = useAuth()
    const [images, setImages] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const test = async ( ) => {
          const data = await unsplash.collections.getPhotos({
            collectionId: 11624136,
            perPage: 20
          })
          setImages(data.response.results);
        }
        test()
        setLoaded(true)
      }, [])

    return backgroundMenu === "Featured" && ( 
        <div className="menu-background-featured-wrapper">

            <div className="menu-background-featured">
            {loaded && images.map((img) => {
                return <ImageItem key={`card-${img.id}`} {...img}/>
            })}
            </div>
        </div>
     );
}
 
export default FeaturedBackgrounds;