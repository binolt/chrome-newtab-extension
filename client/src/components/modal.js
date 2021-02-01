import React, { useEffect, useRef, useState } from 'react';
import useOnClickOutside from '../functions/click-outside';

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

    return modalOpen && ( 
        <div className={`${overlayClassname} modal-overlay`}>
        <div className={className ? `${className} modal-wrapper` : "default-modal modal-wrapper"} ref={modalRef}>
            <div className="modal-content">
                {children}
            </div>
        </div>
        </div>
     );
}
 
export default Modal;