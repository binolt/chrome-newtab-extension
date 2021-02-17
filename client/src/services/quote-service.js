const QuoteService = {
    fetchQuote: () => {
      return fetch("https://type.fit/api/quotes")
        .then((res) => res.json())
        .then((data) => data);
    },
}

export default QuoteService;