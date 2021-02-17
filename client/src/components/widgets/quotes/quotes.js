import React, { useEffect, useState } from 'react';
import { useGlobalAuth } from '../../../context/global-context';
import QuoteService from "../../../services/quote-service";

const Quotes = () => {
    const {quoteData, loaded} = useGlobalAuth();
    const [quote, setQuote] = useState("")

    useEffect(() => {
        const fetchQuote = () => {
            QuoteService.fetchQuote()
            .then(res => {
                const randomItem = Math.floor(Math.random()*res.length);
                console.log(res[randomItem])
                setQuote(res[randomItem])
            })
        }
        fetchQuote();
    }, [])
    return loaded && quoteData.isToggled && ( 
        <div className="content-quotes">
            {quote && `"${quote.text}" - ${quote.author}`}
        </div>
     );
}
 
export default Quotes;