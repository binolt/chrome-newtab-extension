import React, {useState, useEffect} from 'react';
import Menu from "../components/menu/menu"
import Weather from './widgets/weather/weather';
import Moment from "react-moment"
import {useGlobalAuth} from "../context/global-context";
import Modal from './modal';
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";

//ICONS
import {ReactComponent as MenuIcon} from "../icons/menu-black-24dp.svg"; 
import {ReactComponent as Search} from "../icons/search-black-24dp.svg" 
import {ReactComponent as Google} from "../icons/google-icon.svg" 
import { MenuProvider } from '../context/menu-context';

const Landing = () => {
    //global state
    const {loaded, currentImage} = useGlobalAuth()
    //local state
    const [date, setDate] = useState(new Date());
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
      loaded && console.log(currentImage)
      setInterval(() => {
          setDate(new Date())
      }, 1000);
    }, [])


    const closeModal = () => {
      setModalIsOpen(false);
    }

    const openModal = () => {
      setModalIsOpen(true)
    }

    const override = css`
      display: block;
      margin: 0 auto;
      border-color: red;
    `;
  
    return (
      <div>
        <BeatLoader color="#fff" size={15} css={override} loading={!loaded}/>
        <div className="app" style={{backgroundImage: loaded && `url(${currentImage.urls.raw + "&w=1500&dpr=2"})`, opacity: loaded ? 1 : 0}}>
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
        <div className="content-credit">
          {loaded && <p>Photo by <a href={currentImage.user.links.html} target="_blank">{currentImage.user.name}</a> on <a href="https://unsplash.com/">Unsplash</a></p>}
        </div>
        <svg style={{width: 0, height: 0, position: "absolute"}} aria-hidden="true" focusable="false">
          <linearGradient id="my-cool-gradient" x2="1" y2="1">
              <stop offset="0%" stopColor="#07cac3" />
              <stop offset="100%" stopColor="#00ffa2" />
          </linearGradient>
        </svg>
      </div>
      </div>
     );
}
 
export default Landing;