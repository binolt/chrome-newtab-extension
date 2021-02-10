import React, { useEffect, useRef, useState } from 'react';
import useOnClickOutside from '../functions/click-outside';
import TransitionContainer from './transition-container';

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
        <TransitionContainer timeout={350} open={modalOpen} classNames="menu-modal-overlay-primary">
            <div className={`${overlayClassname} modal-overlay`}/>
        </TransitionContainer>
        <TransitionContainer open={modalOpen} classNames="menu-modal-primary" timeout={350}>
        <div className={className ? `${className}` : "default-modal"} ref={modalRef}>
            <div className="modal-content">
                {children}
            </div>
        </div>
        </TransitionContainer>
        </div>
     );
}
 
export default Modal;