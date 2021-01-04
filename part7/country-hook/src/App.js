import React, { useState, useEffect } from 'react'
import axios from 'axios'
require('dotenv').config()

// const API_KEY = process.env.REACT_APP_API_KEY

const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}

const useCountry = (name) => {
    const [country, setCountry] = useState(null)
    
    useEffect(() => {
        if(name) {
            axios.get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
                .then(resp => {
                    return setCountry({
                        data: resp.data[0], 
                        found: true
                    })
                })
                .catch(error => {
                    // console.log(error)
                    setCountry({
                        data: null,
                        found: false
                    })
                })
        }
    }, [name])

    return country
}

const Country = ({ country }) => {
    if (!country) {
        return null
    }

    if (!country.found) {
        return (
        <div>
            not found...
        </div>
        )
    }

    return (
        <div>
        <h3>{country.data.name} </h3>
        <div>capital {country.data.capital} </div>
        <div>population {country.data.population}</div> 
        <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
        </div>
    )
}

const App = () => {
    const nameInput = useField('text')
    const [name, setName] = useState('')
    const country = useCountry(name)

    const fetch = (e) => {
        e.preventDefault()
        setName(nameInput.value)
    }

    return (
        <div>
        <form onSubmit={fetch}>
            <input {...nameInput} />
            <button>find</button>
        </form>

        <Country country={country} />
        </div>
    )
}

export default App