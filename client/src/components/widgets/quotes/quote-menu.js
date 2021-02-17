import React, { useState } from 'react';
import { useAuth } from '../../../context/menu-context';
import Toggle from "react-toggle";
import { useGlobalAuth } from '../../../context/global-context';


const QuoteMenu = () => {
    const {quoteData, setQuoteData} = useGlobalAuth();
    const {menu} = useAuth();

    const handleChange = () => {
        setQuoteData({
            ...quoteData,
            isToggled: !quoteData.isToggled
        })
        if(quoteData.isToggled) {
            syncLocalStorage(false)
            return;
        }
        syncLocalStorage(true)
    }

    const syncLocalStorage = (bool) => {
        const localData = JSON.parse(localStorage.getItem("quotes"));
        const updatedData = {
            ...localData,
            isToggled: bool
        }
        localStorage.setItem("quotes", JSON.stringify(updatedData));
    }
    
    return menu === "Quotes" && ( 
        <div>
            <p>Enable Quotes</p>
            <Toggle onChange={handleChange} checked={quoteData.isToggled}/>
        </div>
     );
}
 
export default QuoteMenu;