import React, {useState} from 'react';
import { createApi } from 'unsplash-js';
import GridLoader from "react-spinners/GridLoader";
import { css } from "@emotion/core";

import {ReactComponent as SearchIcon} from "../../icons/search-black-24dp.svg"
import {ReactComponent as CloseIcon} from "../../icons/settings/close-black-48dp.svg"
import { CSSTransition } from 'react-transition-group';

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
  const [menu, setMenu] = useState("category");
  const [query, setQuery] = useState("");
  const [imagesLoaded, setImagesLoaded] = useState(false);


  const fetchImages = async(query) => {
    const data = await unsplash.search.getPhotos({
      query: query,
      perPage:12,
      orientation: 'landscape',
    });
    const imgs = data.response.results;
    await cacheImages(imgs)
    setImages(imgs);
    setImagesLoaded(true)
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
  }

  const updateQuery = (query) => {
    fetchImages(query);
    setMenu("query")
    setQuery(query);
  }

  const closeQuery = () => {
    setQuery("");
    setImages([])
    setImagesLoaded(false)
    setMenu("category")
  }

  return (
    <div className="menu-unsplash">
      <div className="menu-unsplash-header">
        <span>{query ? <h1 className="menu-unsplash-query-title">{`#${query}`}<CloseIcon onClick={closeQuery}/></h1> : <h1>Categories</h1>}</span>
        <div className="menu-unsplash-search">
          <SearchIcon/>
          <input type="text"/>
        </div>
      </div>
      <CSSTransition in={menu === "category"} unmountOnExit timeout={200} classNames="menu-transition">
        <div className="menu-unsplash-category-wrapper">
          {DEFAULT_CATEGORIES.map((category) => {
            return <Category updateQuery={updateQuery} key={`category-${category.query}`} category={category}/>
          })}
        </div>
      </CSSTransition>
      <CSSTransition in={menu === "query"} unmountOnExit timeout={200} classNames="menu-transition">
        <div className="menu-unsplash-query-wrapper">
          <UnsplashQuery {...props} images={images} imagesLoaded={imagesLoaded}/>
          <span className="menu-unsplash-query-footer">
            <button>Load More</button>
          </span>
        </div>
      </CSSTransition>
    </div>
  )
}
 
export default UnsplashMenu;

const Category = (props) => {
  const {query, url} = props.category
  return (
    <div onClick={() => props.updateQuery(query)} className="menu-unsplash-category" style={{backgroundImage: `url(${url})`}}>
        <h1>#{query}</h1>
    </div>
  )
}


const UnsplashQuery = (props) => {

  return (
    <div className="menu-unsplash-query">
      {props.images && props.imagesLoaded && props.images.map((img => {
        return <div key={`img-${img.id}`} onClick={() => props.changeImage(img)} className="menu-unsplash-query-image" style={{backgroundImage: `url(${img.urls.small})`}}/>
      }))}
      <GridLoader loading={!props.imagesLoaded} css={override} size={15} color="red"/>
    </div>
  )
}