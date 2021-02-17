import React, { useEffect, useRef, useState } from 'react';
import {unsplash} from "../../unsplash-config";
import ImageItem from "../image-item";

import {ReactComponent as SearchIcon} from "../../icons/search-black-24dp.svg";


const UnsplashMenu = () => {
    const [images, setImages] = useState([])
    const [query, setQuery] = useState("Wallpapers");
    const inputRef = useRef(null);

    useEffect(() => {
        const defaultQuery = async ( ) => {
            const localData = JSON.parse(localStorage.getItem("unsplash"));
            if(localData) {
                setImages(localData);
            } else {
                const data = await unsplash.search.getPhotos({
                    query: query,
                    featured: true,
                    perPage: 12,
                    orientation: 'landscape'
                });
                setImages(data.response.results);
                localStorage.setItem("unsplash", JSON.stringify(data.response.results));
            }
          }
          defaultQuery()
    }, [])

    const handleScroll = (e) => {
        console.log(e)
        console.log(e.target.offsetHeight)
        console.log(e.target.scrollTop)
        if(e.target.scrollTop === 175) {
            console.log("bottom")
        }
    }

    const updateQuery = (title) => {
        console.log(title)
        setQuery(title)
        fetchQuery(title);
    }

    const fetchQuery = async(query) => {
        const data = await unsplash.search.getPhotos({
            query: query,
            page: 1,
            perPage: 12,
            orientation: 'landscape',
        });
        setImages(data.response.results);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setQuery(inputRef.current.value);
        fetchQuery(inputRef.current.value)
    }

    return ( 
        <div className="m-unsplash-wrap">
            <div className="m-unsplash-search">
                <form onSubmit={handleSubmit}>
                <input ref={inputRef} type="text" placeholder="Search"/>
                <button type="submit">
                    <SearchIcon/>
                </button>
                </form>
            </div>
            <div className="m-unsplash-cg">
                <UnsplashCategory query={query} updateQuery={updateQuery} title="Wallpapers"/>
                <UnsplashCategory query={query} updateQuery={updateQuery} title="Beach"/>
                <UnsplashCategory query={query} updateQuery={updateQuery} title="Nature"/>
                <UnsplashCategory query={query} updateQuery={updateQuery} title="Mountains"/>
                <UnsplashCategory query={query} updateQuery={updateQuery} title="Snow"/>
                <UnsplashCategory query={query} updateQuery={updateQuery} title="Animals"/> 
            </div>
        <div className="m-unsplash-query-wrap" onScroll={handleScroll} >
        <div className="m-unsplash-query">
           {images && images.map((img) => {
               return <ImageItem key={`card-${img.id}`} {...img}/>
           })}
        </div>
        </div>

            
        </div>
     );
}

const UnsplashCategory = ({title, updateQuery, query}) => {
    useEffect(() => {
        console.log(query)
        console.log(title)
    }, [])
    return (
        <span onClick={() => updateQuery(title)} style={{backgroundColor: query === title && "orange"}}>
            <p>{title}</p>
        </span>
    )
}
 
export default UnsplashMenu;