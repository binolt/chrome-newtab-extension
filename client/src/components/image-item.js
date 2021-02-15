import React, {useState, useRef, useEffect} from 'react';
import { useGlobalAuth } from '../context/global-context';


import {ReactComponent as HeartOutline} from "../icons/favorite_border-black-48dp.svg";
import {ReactComponent as HeartFilled} from "../icons/favorite-black-48dp.svg";


const ImageItem = (img) => {
    const {setBackgroundImage, favorited, setFavorited} = useGlobalAuth()
    const [spans, setSpans] = useState(0)
    const heartRef = useRef(null);
    const imageRef = useRef(null);
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
      if(e.target === heartRef.current) {
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
      <div className="menu-image-item" style={{gridRowEnd: `span ${spans}`}} onMouseOver={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
        <span onClick={updateImage}>
        {isHovering && (
        <div className="menu-image-item-favorite">
          <HeartFilled style={{opacity: image.isFavorite ? 1 : 0}} />
          <HeartOutline style={{opacity: image.isFavorite ? 0 : 1}}/>
          <div ref={heartRef} onClick={handleFavorite}/>
        </div>
        )}
        <img
          ref={imageRef}
          src={image.urls.small}
          alt={image.description}
          />
          </span>
      </div>
    )
}
 
export default ImageItem;