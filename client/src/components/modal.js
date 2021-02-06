import React, { useEffect, useRef, useState } from 'react';
import useOnClickOutside from '../functions/click-outside';
import {CSSTransition} from "react-transition-group";

const Modal = ({className, isOpen, onRequestClose, overlayClassname, children}) => {
    const modalRef = useRef(null);
    const [modalOpen, setModalOpen] = useState(false);

    
    const closeModal = () => {
        setModalOpen(false)
        onRequestClose()
    }

    useEffect(() => {
        setModalOpen(isOpen)
    }, [isOpen])


    useOnClickOutside(modalRef, closeModal)

    return ( 
        <div>
        <CSSTransition   in={modalOpen} unmountOnExit timeout={350} classNames="menu-modal-overlay-primary">
        <div className={`${overlayClassname} modal-overlay`}/>
        </CSSTransition>
        <CSSTransition in={modalOpen} unmountOnExit timeout={400} classNames="menu-modal-primary">
        <div className="modal-wrapper">
        <div className={className ? `${className}` : "default-modal"} ref={modalRef}>
            <div className="modal-content">
                {children}
            </div>
        </div>
        </div>
        </CSSTransition>
        </div>
     );
}
 
export default Modal;