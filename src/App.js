import Search from './components/Search/Search';
import CurrentWeather from './components/CurrentWether/CurrentWeather';
import { WEATHER_API_URL, WEATHER_API_KEY } from './constants/constants';
import './App.css';
import { useState } from 'react';
import Forecast from './components/Forecast/Forecast';
import Footer from './components/Footer/Footer';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecst] = useState(null);

  const handleOnSearchChange =(searchData)=>{
   const [lat, lon] = searchData.value.split(" "); 
   const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
   const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

  Promise.all([currentWeatherFetch, forecastFetch])
    .then(async (response) =>{
      const weatherResponse = await response[0].json();
      const forecastResponse = await response[1].json();

      setCurrentWeather({city:searchData.label, ...weatherResponse});
      setForecst({city:searchData.label, ...forecastResponse});

    })
    .catch((err)=> console.log(err));
  }
  console.log(currentWeather);
  console.log(forecast);
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
      {currentWeather && <CurrentWeather data={currentWeather}/>}
     { forecast && <Forecast data={forecast}/>}
     <Footer/>
    </div>
  );
}

export default App;
