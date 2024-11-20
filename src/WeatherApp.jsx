import React, { useState } from 'react';

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const API_KEY = '21805bff7224936fa25d6cec016a0a4b';

    const fetchWeatherData = async () => {
        if (!city.trim()) {
            shakeInput();
            return;
        }

        setWeatherData({ loading: true });
        setError(null);

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            const data = await response.json();

            if (response.ok) {
                setWeatherData(data);
                console.log(data);
                
            } else {
                setWeatherData(null);
                setError('City not found');
            }
        } catch {
            setWeatherData(null);
            setError('Unable to fetch weather data');
        } finally {
            setCity('');
        }
    };

    const handleKeyUp = (e) => {
        if (e.key === 'Enter') {
            fetchWeatherData();
        }
    };

    const shakeInput = () => {
        const input = document.querySelector('#inp');
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 300);
    };

    return (
        <div className="container">
            <h1 className="app-title">Weather App</h1>
            <div className="main">
                <div className="input-container">
                    <input
                        type="text"
                        id="inp"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onKeyUp={handleKeyUp}
                        placeholder="Enter city name"
                    />
                    <button onClick={fetchWeatherData}>Search</button>
                </div>
                <div id="weather-box">
                    {weatherData?.loading ? (
                        <img
                            src="https://i.gifer.com/VAyR.gif"
                            alt="Loading..."
                            className="loading-gif"
                        />
                    ) : error ? (
                        <h2>{error}</h2>
                    ) : weatherData ? (
                        <>
                            <h2 className="city-name">{weatherData.name}, {weatherData.sys.country}</h2>
                            <img
                                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                                alt="weather icon"
                            />
                            <div className="weather-info">
                                <h2>{weatherData.main.temp} °C</h2>
                                <h4>{weatherData.weather[0].description}</h4>
                                <h4>Humidity: {weatherData.main.humidity}%</h4>
                                <h4>Wind: {weatherData.wind.speed} m/s</h4>
                            </div>
                        </>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;
