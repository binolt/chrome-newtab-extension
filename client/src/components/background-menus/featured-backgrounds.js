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
    const {favorited} = useGlobalAuth();
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

const ImageItem = (img) => {
  const {setBackgroundImage, favorited, setFavorited} = useGlobalAuth()
  const [spans, setSpans] = useState(0)
  const imageRef = useRef(null);
  const svgRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false)
  const [image, setImage] = useState(img);
  
  useEffect(() => {
    const updateSpans = () => {
      const height = imageRef.current.clientHeight;
      const spans = Math.ceil(height / 80);
      setSpans(spans);
      imageRef.current.removeEventListener("load", updateSpans)
    }
    imageRef.current.addEventListener("load", updateSpans);
    const checkFavorites = () => {
      if(favorited) {
        favorited.forEach((item) => {
          if(item.id === image.id) {
            setImage({
              ...image,
              isFavorite: true
            })
          } 
        })
      }
    }
    checkFavorites();
  }, [])

  const updateImage = (e) => {
    if(e.target === svgRef.current) {
      return;
    }
    localStorage.setItem("backgroundImg", image.urls.full)
    setBackgroundImage(image.urls.full)
  }

  const handleFavorite = () => {
    let updatedList = []
    let favoritedList = JSON.parse(localStorage.getItem("favorited"));

    if(!favoritedList) {
      updatedList = [
        image
      ]
    }


    if(favoritedList) {
      let newList = [];
      let duplicateItem = undefined;

      favoritedList.forEach(item => {
        //if img already favorite | remove it
        if(item.id === image.id) {
          duplicateItem = item;
          return;
        }
        newList.push(item);
      })
      
      //update list w/ new image
      if(duplicateItem) {
        updatedList = newList;
        setImage({
          ...image,
          isFavorite: false
        })
      } else {
        setImage({
          ...image,
          isFavorite: true
        })
        updatedList = [
          ...newList,
          image
        ]
      }
    }

    setFavorited(updatedList);
    
    localStorage.setItem("favorited", JSON.stringify(updatedList));
  }


  return (
    <div style={{gridRowEnd: `span ${spans}`}} onMouseOver={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
      <span onClick={updateImage}>
      {isHovering && <Heart style={{background: image.isFavorite && "red"}} ref={svgRef} onClick={handleFavorite}/>}
      <img
        ref={imageRef}
        src={image.urls.small}
        alt={image.description}
        />
        </span>
    </div>
  )
}
 
export default FeaturedBackgrounds;