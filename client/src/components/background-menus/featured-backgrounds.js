import React, {useEffect, useRef, useState} from 'react';
import { useAuth } from '../../context/menu-context';
import { createApi } from 'unsplash-js';

const unsplash = createApi({
    accessKey: process.env.REACT_APP_UNSPLASH_API_KEY,
    headers: { 'X-Custom-Header': 'foo' },
});



const FeaturedBackgrounds = () => {
    const {backgroundMenu} = useAuth()
    const [images, setImages] = useState([])
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        // const test = async() => {
        //   const data = await unsplash.search.getPhotos({
        //     featured: true,
        //     query: "wallpapers",
        //     perPage: 20
        //   })
        //   setImages(data.response.results);
        // }
        // test()
        // setLoaded(true)
        const test = async ( ) => {
          const data = await unsplash.collections.get({
            collectionId: 11624136
          })
          console.log(data)
        }
        test()
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
  const [spans, setSpans] = useState(0)
  const imageRef = useRef(null)
  useEffect(() => {
    imageRef.current.addEventListener("load", updateSpans);
  }, [])

  const updateSpans = () => {
    const height = imageRef.current.clientHeight;
    const spans = Math.ceil(height / 80);
    setSpans(spans);
    imageRef.current.removeEventListener("load", updateSpans)
  }
  return (
    <div style={{gridRowEnd: `span ${spans}`}}>
    <img
      ref={imageRef}
      src={img.urls.small}
      alt={img.description}
    />
    </div>
  )
}
 
export default FeaturedBackgrounds;