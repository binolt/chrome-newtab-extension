import React, {useEffect, useRef, useState} from 'react';
import { useAuth } from '../../context/menu-context';
import { createApi } from 'unsplash-js';
import { useGlobalAuth } from '../../context/global-context';

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
  const imageRef = useRef(null)
  useEffect(() => {
    const updateSpans = () => {
      const height = imageRef.current.clientHeight;
      const spans = Math.ceil(height / 80);
      setSpans(spans);
      imageRef.current.removeEventListener("load", updateSpans)
    }
    imageRef.current.addEventListener("load", updateSpans);
  }, [])

  const updateImage = (img) => {
    localStorage.setItem("backgroundImg", img)
    setBackgroundImage(img)
  }

  return (
    <div style={{gridRowEnd: `span ${spans}`}}>
    <img
      onClick={() => updateImage(img.urls.full)}
      ref={imageRef}
      src={img.urls.small}
      alt={img.description}
    />
    </div>
  )
}
 
export default FeaturedBackgrounds;