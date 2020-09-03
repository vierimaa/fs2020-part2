import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [ countryData, setCountryData] = useState([])
  const [ newSearch, setNewSearch ] = useState('')

  // const api_key = process.env.REACT_APP_API_KEY

  const handleSearchChange = (event) => setNewSearch(event.target.value)
  const handleShowMore = (name) => setNewSearch(name)
  
  const countryNameFilter = (country) => country.name.toUpperCase().includes(newSearch.toUpperCase())

  useEffect(() => {
    console.log('effect')
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(res => {
      console.log('promise fullfilled')
      setCountryData(res.data)
    }) 
  }, [])

  return (
    <div>
      <h2>Search for country data</h2>
      <Filter value={newSearch} onChange={handleSearchChange} />
      <Countries countriesToShow={countryData.filter(countryNameFilter)} handleShowmore={handleShowMore} />
    </div>
  )
}

export default App