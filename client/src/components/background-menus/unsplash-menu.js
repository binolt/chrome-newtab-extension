import React, {useState, useEffect} from 'react';
import { createApi } from 'unsplash-js';

const unsplash = createApi({
    accessKey: process.env.REACT_APP_UNSPLASH_API_KEY,
    headers: { 'X-Custom-Header': 'foo' },
});

const UnsplashMenu = (props) => {
    const [images, setImages] = useState([])
    useEffect(() => {
        unsplash.search.getPhotos({
            query: 'beach',
            perPage: 10,
            orientation: 'landscape',
          }).then(data => {
            let imgs = []
            data.response.results.forEach((img => {
              imgs.push(img.urls.full)
            }))
            setImages(imgs)
          })
    }, [])
    return (
        <div>
            {images.map(((image, index) => {
            return <img key={image} onClick={() => props.changeImage(image)} src={image} alt={`cat-${index}`}/>
            }))}
        </div>
    )
}
 
export default UnsplashMenu;