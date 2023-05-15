import React, { useState } from 'react'
import axios from 'axios'
import'./App.css';

function App() {
    const [data, setData] = useState({});
    const [location, setLocation] = useState("");

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=9fb336a7dcc475fb13e2e8d3cb229a19`;
    
    const searchLocation = (e) => {
        if(e.key === 'Enter'){
            axios.get(url).then(res => {
                setData(res.data);
                console.log(res.data)
            });
            setLocation("");
        }
    }

    return (
        <div className='app'>
            <div className='search'>
                <input type='text' placeholder='Enter Location'
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    onKeyDown={searchLocation}
                />
            </div>
            <div className='container'>
                <div className='top'>
                    <div className='location'>
                        <p>{data.name}</p>
                        {data.sys ? <p>{data.sys.country}</p> : null}
                    </div>
                    <div className='temp'>
                    {data.main ? <h1>{(data.main.temp - 273.15).toFixed()}°C</h1> : null}

                    </div>
                    <div className='desc'>
                        {data.weather ? <p>{data.weather[0].main}</p> : null} 
                    </div>
                </div>

                <div className='bottom'>
                    <div className='feels'>
                      {data.main ? <p>{(data.main.feels_like - 273.15).toFixed()}°C</p> : null}
                        <p>Feels Like</p>
                    </div>
                    <div className='humidity'>
                        {data.main ? <p>{data.main.humidity}%</p> : null}
                        <p>Humidity</p>
                    </div>
                    <div className='wind'>
                    {data.wind ? <p>{(data.wind.speed).toFixed()}m/s</p> : null}
                        <p>Wind Speed</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App;

