import React, {useState, useEffect} from 'react';
import { createApi } from 'unsplash-js';
import GridLoader from "react-spinners/GridLoader";
import { css } from "@emotion/core";

import {ReactComponent as SearchIcon} from "../../icons/search-black-24dp.svg"

const unsplash = createApi({
    accessKey: process.env.REACT_APP_UNSPLASH_API_KEY,
    headers: { 'X-Custom-Header': 'foo' },
});

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const DEFAULT_CATEGORIES = [
  {query: "snow", url: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"},
  {query: "sky", url: "https://images.unsplash.com/photo-1501619757722-90657a99803b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"},
  {query: "beach", url: "https://images.unsplash.com/photo-1525183995014-bd94c0750cd5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80"},
  {query: "forest", url: "https://images.unsplash.com/photo-1516214104703-d870798883c5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"},
  {query: "nature", url: "https://images.unsplash.com/photo-1606145573422-4143383ee7a6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"},
  {query: "animals", url: "https://images.unsplash.com/photo-1579380656108-f98e4df8ea62?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"},
]
                          
                          

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
    <div className="menu-unsplash">
      <div className="menu-unsplash-header">
        <h1>Categories</h1>
        <div className="menu-unsplash-search">
          <SearchIcon/>
          <input type="text"/>
        </div>
      </div>
      <div className="menu-unsplash-category-wrapper">
        {DEFAULT_CATEGORIES.map((category) => {
          return <Category key={`category-${category.query}`} category={category}/>
        })}
        {/* {images.map(((image, index) => {
          return <div className="menu-unsplash-image" key={`image-${image.id}`} onClick={() => props.changeImage(image)} style={{backgroundImage: `url(${image.urls.small})`}} alt={`cat-${index}`}/>
        }))} */}
        {/* <GridLoader loading={!loaded} css={override} color="blue" size={15}/> */}
      </div>
    </div>
  )
}
 
export default UnsplashMenu;

const Category = (props) => {
  const {query, url} = props.category
  return (
    <div className="menu-unsplash-category" style={{backgroundImage: `url(${url})`}}>
        <h1>#{query}</h1>
    </div>
  )
}