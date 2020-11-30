import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';

const Search = ({searchTerm, searchHandler}) => {
	return(
		<p> Find countries: <input value={searchTerm} onChange={searchHandler}/></p>
	)
}

const Display = ({searchResults, countryInfo, updateCountryInfo, updateSearch, weatherInfo, updateWeatherInfo, api_key}) => {
	if(searchResults.length === 1){
		return(
			<>
			<CountryStats searchResults={searchResults} 
						countryInfo={countryInfo} 
						updateCountryInfo={updateCountryInfo} 
						weatherInfo={weatherInfo}
						updateWeatherInfo={updateWeatherInfo}
						api_key={api_key}/>
			</>
		)
	} else if(searchResults.length < 10) {
		return(
			<CountryList searchResults={searchResults} updateSearch={updateSearch}/>
		)
	} else {
		return(
			<p>Too many matches, specify a stricter filter</p>
		)
	}
	
}

const CountryList = ({searchResults, updateSearch}) => {
	return(
		<ul>
			{searchResults.map(c => 
				<li key={c.code}>{c.name} ({c.code}) 
				<button onClick={() => updateSearch(c.name)}>show</button></li>)
			}
		</ul>
		)
}

const CountryStats = ({searchResults, countryInfo, updateCountryInfo, weatherInfo, updateWeatherInfo, api_key}) => {

// 	console.log("search results:", searchResults[0])    	
	console.log("Stats 1")
    useEffect(() => {    
		axios
		.get(`https://restcountries.eu/rest/v2/alpha/${searchResults[0].code}`)
		.then(response => {        
			console.log("Countries data received", response.data)
	      	updateCountryInfo(response.data)
    	})
    	.catch(error => console.warn(error))
  	}, [])

	if(countryInfo.name === searchResults[0].name){
		console.log("Stats rendered")	
		return(
			<div>
				<h2>{countryInfo.name}</h2>
				<div>
					<p>Capital: {countryInfo.capital}</p>
					<p>Population: {countryInfo.population}</p>
				</div>
				<div>
					<h3>Language{countryInfo.languages.length === 1 ? "" : "s"}</h3>
					<ul>
						{countryInfo.languages.map(l => <li key={l.name}>{l.name}, ({l.nativeName})</li>)}
					</ul>
				</div>
				<div>
					<img src={countryInfo.flag} alt={"the flag of " + countryInfo.name} width="130px"/>
				</div>
				<div>	
					<Weather searchResults={searchResults} 
							countryInfo={countryInfo}
							weatherInfo={weatherInfo} 
							updateWeatherInfo={updateWeatherInfo} 
							api_key={api_key}/></div>
				</div>
		)
	} else {
		console.log("Stats Loading")
		return(
			<div>
				loading...
			</div>
		)
	}
}

const Weather = ({countryInfo, weatherInfo, updateWeatherInfo, api_key}) => {

    useEffect(() => {    
		const request = `http://api.weatherstack.com/current?access_key=${api_key}&query=${countryInfo.capital}`
		console.log("request url:", request)
		console.log("Weather requested")
		axios
		// .get("http://api.weatherstack.com/current/", {params})
		.get(request)
		.then(response => {        
	     	console.log('Weather data received: ', response.data)        
	      	updateWeatherInfo(response.data)
    	})
    	.catch(error => console.warn(error))
  	}, [])

	console.log("Capital city:", countryInfo.capital)
  	console.log("weather exists?", weatherInfo.location !== undefined)


    if(weatherInfo.location !== undefined){
    	if(countryInfo.capital === weatherInfo.location.name){
	    	console.log("Weather rendered")
			return(
				<>
				<h3>Weather in {weatherInfo.location.name}</h3>
				<p><b>temperature:</b> {weatherInfo.current.temperature} Celcius</p>
				<img src={weatherInfo.current.weather_icons[0]} alt="weather icon" width="50px"/>
				<p><b>wind:</b> {weatherInfo.current.wind_speed} km/h {weatherInfo.current.wind_dir} </p>
				</>
			)
		} else {
			return(null)
		}
	} 

	console.log("Weather loading")
	return(
		<div>loading weather...</div>
	)

}

function App() {
	const [ searchTerm, updateSearch] = useState("")
	const [ allCountries, updateAllCountries ] = useState([])
	const [ countryInfo, updateCountryInfo] = useState({})
	const [ weatherInfo, updateWeatherInfo] = useState({})

	const api_key = process.env.REACT_APP_API_KEY

    useEffect(() => {    
		axios
		.get("https://restcountries.eu/rest/v2/all")
		.then(response => {        
     	console.log('Response', response.data.map(entry => entry.name))     
      	updateAllCountries(response.data.map(
      		entry => {return({	code:entry.alpha2Code, 
      							name:entry.name})} 
      	))
        })  
      }, 
    [])

	const searchHandler = (event) => {
		console.log(event.target.value)
		updateSearch(event.target.value)
	}

	const searchResults = allCountries.filter(country => country.name.toLowerCase().includes(searchTerm.toLowerCase()))

	return (
		<div>
			<Search searchTerm={searchTerm} 
					searchHandler={searchHandler}/>

			<Display searchResults={searchResults} 
					countryInfo={countryInfo} 
					updateCountryInfo={updateCountryInfo} 
					updateSearch={updateSearch} 
					weatherInfo={weatherInfo} 
					updateWeatherInfo={updateWeatherInfo} 
					api_key={api_key}/>
		</div>
	)
}

export default App;
