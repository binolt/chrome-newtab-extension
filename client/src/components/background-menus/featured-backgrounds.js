import React, {useEffect, useRef, useState} from 'react';
import { useAuth } from '../../context/menu-context';
import { createApi } from 'unsplash-js';
import { useGlobalAuth } from '../../context/global-context';

import {ReactComponent as Heart} from "../../icons/favorite_border-black-48dp.svg";

const unsplash = createApi({
    accessKey: process.env.REACT_APP_UNSPLASH_API_KEY,
    headers: { 'X-Custom-Header': 'foo' },
});



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
          console.log(data)
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

const ImageItem = (img) => {
  const {setBackgroundImage} = useGlobalAuth()
  const [spans, setSpans] = useState(0)
  const imageRef = useRef(null);
  const svgRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false)
  
  useEffect(() => {
    const updateSpans = () => {
      const height = imageRef.current.clientHeight;
      const spans = Math.ceil(height / 80);
      setSpans(spans);
      imageRef.current.removeEventListener("load", updateSpans)
    }
    imageRef.current.addEventListener("load", updateSpans);
  }, [])

  const updateImage = (e) => {
    if(e.target === svgRef.current) {
      return;
    }
    localStorage.setItem("backgroundImg", img.urls.full)
    setBackgroundImage(img.urls.full)
  }

  const handleFavorite = () => {
    let updatedList = []
    let favoritedList = JSON.parse(localStorage.getItem("favorited"));
    if(!favoritedList) {
      updatedList = [
        {image: img}
      ]
    }
    if(favoritedList) {
      favoritedList.forEach(item => {
        //if img already favorite | remove it
        if(item.image.id === img.id) {
          favoritedList.filter(removeImage);
          console.log(favoritedList);
        }


      })

      console.log("SECOND", favoritedList)

      //update list w/ new image
      updatedList = [
        ...favoritedList,
        {image: img}
      ]
    }

    localStorage.setItem("favorited", JSON.stringify(updatedList));
  }

  const removeImage = (item) => {
    if(item.image.id !== img.id) {
      return;
    }
    
  }

  return (
    <div style={{gridRowEnd: `span ${spans}`}} onMouseOver={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
      <span onClick={updateImage}>
      {isHovering && <Heart ref={svgRef} onClick={handleFavorite}/>}
      <img
        ref={imageRef}
        src={img.urls.small}
        alt={img.description}
        />
        </span>
    </div>
  )
}
 
export default FeaturedBackgrounds;