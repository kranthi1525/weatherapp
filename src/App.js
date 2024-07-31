import './App.css';
import { useState, useEffect } from 'react';

const api = {
  key: '97671f2477085d071632de7a423eb154',
  base: 'https://api.openweathermap.org/data/2.5/',
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  useEffect(() => {
    if (typeof weather.weather !== "undefined") {
      const condition = weather.weather[0].main.toLowerCase();
      let backgroundImage = '';

      switch (condition) {
        case 'clear':
          backgroundImage = 'url(https://img.freepik.com/free-photo/white-cloud-blue-sky_74190-7728.jpg)';
         
          break;
        case 'clouds':
          backgroundImage = 'url(https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg?cs=srgb&dl=pexels-pixabay-158163.jpg&fm=jpg)';
         
          break;
        case 'rain':
          backgroundImage = 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcxo9A_pxGWPRqb26IsHQp1T_3JVcKWbezYA&usqp=CAU)';
          
          break;
        case 'snow':
          backgroundImage = 'url(https://images7.alphacoders.com/134/thumb-1920-1343531.png)';
         
          break;
        case 'thunderstorm':
          backgroundImage = 'url(https://i.pinimg.com/originals/d3/e3/8f/d3e38f77801c4ffe2f75384a3c3f2be9.jpg)';
          
          break;
        default:
          backgroundImage = 'url(https://cff2.earth.com/uploads/2018/11/13053559/what-is-mist.jpg)';
          
      }

      const bodyInfo = document.querySelector('body');

      if (bodyInfo) {
        bodyInfo.style.backgroundImage = backgroundImage;
        
      }
     
    }
  }, [weather]);

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        console.log(weather);
      });
  };

  return (
    <div className="App">
      <header className="app-header">
        {/* HEADER */}
        <h1>Weather App</h1>
        {/* SEARCHBOX */}
        <div>
          <input
            type="text"
            placeholder="Enter your city/town"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchPressed}>Search</button>
        </div>
        {typeof weather.main !== "undefined" ? (
          <div className="weather-info">
            {/* Location */}
            <p className="location">{weather.name}</p>
            {/* Temperature Celsius */}
            <p className="temperature">{weather.main.temp}°C</p>
            {/* Condition (Sunny) */}
            <p className="condition">{weather.weather[0].main}</p>
            <p className="description">({weather.weather[0].description})</p>
          </div>
        ) : (
          ""
        )}
      </header>
    </div>
  );
}

export default App;