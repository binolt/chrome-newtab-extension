import React, { useEffect, useState } from 'react';
import Moment from "react-moment"
import "./css/app/app.css"
import Modal from 'react-modal';
import Menu from "./components/menu"


//ICONS
import {ReactComponent as MenuIcon} from "./icons/menu-black-24dp.svg" 
import {ReactComponent as Search} from "./icons/search-black-24dp.svg" 
import {ReactComponent as Google} from "./icons/google-icon.svg" 
import {ReactComponent as CloseIcon} from "./icons/settings/close-black-48dp.svg"



const DEFAULT_BACKGROUND = "https://res.cloudinary.com/dxqmbhsis/image/upload/v1610226492/clouds_background_pkxdke.jpg"

const App = () => {
  const [date, setDate] = useState(new Date());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("")
  const [loaded, setLoaded] = useState(false);

  const preload = () => {
    const background = localStorage.getItem("backgroundImg")
    const img = new Image()
    img.src = background ? background : DEFAULT_BACKGROUND;
    img.onload = () => {
      setBackgroundImage(img.src)
      setLoaded(true)
    }
  }
  
  useEffect(() => {
    preload()
    setInterval(() => {
      setDate(new Date())
    }, 1000);
  }, [])

  const changeImage = (img) => {
    localStorage.setItem("backgroundImg", img);
    setBackgroundImage(img)
  }

  return ( 
    <div className="app" style={{backgroundImage: `url(${backgroundImage})`, opacity: loaded ? 1 : 0}}>
      <div className="app-container">
        <a rel="noreferrer" className="content-square" href="https://www.youtube.com/" target="_blank">
          <div className="arrow-right"/>
        </a>
      </div>
      <div className="content-search">
        <span className="content-search-head">
        <Google className="content-icons-google"/>
        </span>
        <form action="http://www.google.com/search" method="get"> 
          <input type="text" placeholder="Enter your search" name="q"/>
          <button type="submit" value="search" className="content-search-foot">
            <Search/>
          </button>
        </form>
      </div>
      <div className="content-menu-placeholder" onClick={() => setModalIsOpen(!modalIsOpen)}>
        <MenuIcon/>
      </div>
      <Modal closeTimeoutMS={250} className="menu-modal" overlayClassName="menu-overlay" onRequestClose={() => setModalIsOpen(false)} isOpen={modalIsOpen} contentLabel="modal">
          <Menu changeImage={changeImage}/>
          <CloseIcon className="menu-close" onClick={() => setModalIsOpen(false)}/>
      </Modal>
      <div className="content-time">
        <Moment format="h:mm">
          {date}
        </Moment>
      </div>
      <svg style={{width: 0, height: 0, position: "absolute"}} aria-hidden="true" focusable="false">
        <linearGradient id="my-cool-gradient" x2="1" y2="1">
            <stop offset="0%" stopColor="#07cac3" />
            <stop offset="100%" stopColor="#00ffa2" />
        </linearGradient>
      </svg>
    </div>
   );
}
 
export default App;
