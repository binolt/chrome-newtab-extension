import React, {useState, useEffect, useRef} from 'react';
import Menu from "../components/menu/menu"
import Weather from './widgets/weather/weather';
import Moment from "react-moment"
import {useAuth} from "../context/global-context";
import Modal from './modal';

//ICONS
import {ReactComponent as MenuIcon} from "../icons/menu-black-24dp.svg"; 
import {ReactComponent as Search} from "../icons/search-black-24dp.svg" 
import {ReactComponent as Google} from "../icons/google-icon.svg" 
import { MenuProvider } from '../context/menu-context';
// import {ReactComponent as CloseIcon} from "../icons/settings/close-black-48dp.svg"

const Landing = () => {
    //global state
    const {loaded, backgroundImage, setBackgroundImage} = useAuth()
    //local state
    const [date, setDate] = useState(new Date());
    const [modalIsOpen, setModalIsOpen] = useState(false);

    
    useEffect(() => {
        setInterval(() => {
            setDate(new Date())
        }, 1000);
    }, [])
  
  
  
    const changeImage = (img) => {
        localStorage.setItem("backgroundImg", img.urls.full);
        setBackgroundImage(img.urls.full)
    }

    const closeModal = () => {
      setModalIsOpen(false);
    }

    const openModal = () => {
      setModalIsOpen(true)
    }
  
    return ( 
        <div className="app" style={{backgroundImage: `url(${backgroundImage})`, opacity: loaded ? 1 : 0}}>
        {/* <div className="app-container">

        </div> */}
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
        <Weather/>
        <div className="content-menu-placeholder" onClick={openModal}>
          <MenuIcon/>
        </div>
        {/* <Modal closeTimeoutMS={250} className="menu-modal" overlayClassName="menu-overlay" onRequestClose={() => setModalIsOpen(false)} isOpen={modalIsOpen} contentLabel="modal">
            <Menu changeImage={changeImage}/>
            <CloseIcon className="menu-close" onClick={() => setModalIsOpen(false)}/>
        </Modal> */}
        <Modal className="menu-modal" overlayClassname="menu-modal-overlay" isOpen={modalIsOpen} onRequestClose={closeModal}>
          <MenuProvider>
          <Menu/>
          </MenuProvider>
        </Modal>
        <div className="content-time">
          <Moment format="h:mm" className="content-time-clock">
            {date}
          </Moment>
          <Moment format="dddd, MMMM DD" className="content-time-date">
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
 
export default Landing;