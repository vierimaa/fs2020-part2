import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_KEY = process.env.REACT_APP_API_KEY
const baseUrl = `http://api.weatherstack.com/current?access_key=${API_KEY}`

const Weather = ({ capital }) => {
    const [ weatherData, setWeatherData] = useState([])

    useEffect(() => {
        console.log('effect')
        axios.get(`${baseUrl}&query=${capital}`)
            .then(response => {
                setWeatherData(response.data.current)
            })
    }, [capital])

    let countryWeatherDisplay
    if (weatherData.length < 1){
        countryWeatherDisplay = (
            <div>
                <p>Loading weather data...</p>
            </div>
        )
    } else {
        countryWeatherDisplay = (
            <div>
                <p>Temeperature in {capital} is currently {weatherData.temperature} Celsius.</p>
                <img src={weatherData.weather_icons[0]} alt="weather" height="100" />
                <p>Wind: {weatherData.wind_speed} MPH, {weatherData.wind_degree} {weatherData.wind_dir}</p>
            </div>
        ) 
    }

    return (
        <div>
            {countryWeatherDisplay}
        </div>
    )
}

export default Weather;