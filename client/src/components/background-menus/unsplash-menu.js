import React, {useState, useEffect} from 'react';
import { createApi } from 'unsplash-js';
import GridLoader from "react-spinners/GridLoader";
import { css } from "@emotion/core";

const unsplash = createApi({
    accessKey: process.env.REACT_APP_UNSPLASH_API_KEY,
    headers: { 'X-Custom-Header': 'foo' },
});

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;



const UnsplashMenu = (props) => {
  const [images, setImages] = useState([])
  const [loaded, setLoaded] = useState(false)

  const fetchImages = () => {
    unsplash.search.getPhotos({
      query: 'beach',
      perPage: 10,
      orientation: 'landscape',
    }).then(data => {
      let imgs = []
      data.response.results.forEach((img => {
        imgs.push(img)
      }))
      setImages(imgs)
      cacheImages(imgs)
    })
  }

  const cacheImages = async(imgs) => {
    const promises = await imgs.map((image => {
      return new Promise(function(resolve, reject) {
        const img = new Image();
        img.src = image.urls.full;
        img.onload = resolve();
        img.onerror = reject()
      })
    }))
    await Promise.all(promises);
    setLoaded(true)
  }

  useEffect(() => {
    fetchImages()
  }, [])

  return (
    <div>
        {images.map(((image, index) => {
        return <img key={`image-${image.id}`} onClick={() => props.changeImage(image)} src={image.urls.small} alt={`cat-${index}`}/>
        }))}
        <GridLoader loading={!loaded} css={override} color="blue" size={15}/>
    </div>
  )
}
 
export default UnsplashMenu;