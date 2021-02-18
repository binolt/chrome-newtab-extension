import React, { useEffect, useState } from 'react';
import { useGlobalAuth } from '../../../context/global-context';
import QuoteService from "../../../services/quote-service";

const Quotes = () => {
    const {quoteData, loaded} = useGlobalAuth();
    const [quote, setQuote] = useState("")

    useEffect(() => {
        const fetchQuote = () => {
            const localData = JSON.parse(localStorage.getItem("quotes"));
            if(localData) {
                //checks local storage
                if(localData && localData.date) {
                    const currentDate = new Date();
                    //only generate quote once per day
                    if(localData.date === currentDate.getDay()) {
                        setQuote(localData.quote);
                        return;
                    }
                }
                //fetch quote from API
                QuoteService.fetchQuote()
                .then(res => {
                    const date = new Date();
                    const randomItem = Math.floor(Math.random()*res.length);
                    setQuote(res[randomItem])
                    
                    //update local storage
                    const updatedData = {
                        ...localData,
                        quote: res[randomItem],
                        date: date.getDay()
                    }
                    localStorage.setItem("quotes", JSON.stringify(updatedData));
                })
            }
        }
        fetchQuote();
    }, [quoteData])


    return loaded && quoteData.isToggled && ( 
        <div className="content-quotes">
            {quote && `"${quote.text}" - ${quote.author}`}
        </div>
     );
}
 
export default Quotes;