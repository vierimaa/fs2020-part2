import React from 'react'
import Weather from './Weather'

const Countries = ({ countriesToShow, handleShowmore }) => {

    const CountryList = ({ countriesToShow }) => countriesToShow.map(country => <div key={country.name}>{country.name} <button key={country.name} onClick={() => handleShowmore(country.name)}>show</button></div>)

    const Country = ({ country }) => {
        return(
            <div key={country.name}>
                <h2 key={country.name}>{country.name}</h2>
                <p key={country.capital}>Capital: {country.capital}</p>
                <p key={country.population}>Population: {country.population}</p>
                <h2 key={country.alpha3Code}>Languages</h2>
                {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
                <img src={country.flag} alt="Flag" height="100" />
                <Weather capital={country.capital} />
            </div>
        )
    }

    let display
    if (countriesToShow.length === 0){
        display = <p>Countries not found!</p>
    } else if (countriesToShow.length === 1) {
        display = <Country country={countriesToShow[0]} />
    } else if (countriesToShow.length < 10 && countriesToShow.length > 1){
        display = <CountryList countriesToShow={countriesToShow} />
    } else {
        display = <p>Too many matches to show, please use another filter!</p>
    }

    return (
        <div>
            {display}
        </div>
    )
}

export default Countries;