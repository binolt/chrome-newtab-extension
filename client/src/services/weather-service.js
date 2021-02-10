const WeatherService = {
      fetchCity: (lat, lon) => {
        return fetch(`https://us1.locationiq.com/v1/reverse.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&lat=${lat}&lon=${lon}&format=json`)
          .then((res) => res.json())
          .then((data) => data);
      },
      fetchWeather: (city) => {
        return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=imperial`)
          .then((res) => res.json())
          .then((data) => data);
      },
}

export default WeatherService;