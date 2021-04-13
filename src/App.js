import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
	const [weather, setWeather] = useState(null);
	const [input, setInput] = useState('');
	useEffect(() => {
		axios
			.get(
				'http://api.weatherapi.com/v1/current.json?key=a4ab2c97c17d41b8a99154701211304&q=London',
			)
			.then(data => {
				setWeather(data.data);
				console.log(data.data);
			})
			.catch(err => console.log(err));
	}, []);
	//event
	const weatheInput = e => {
		setInput(e.target.value);
	};
	const searchWeather = () => {
		axios
			.get(
				`http://api.weatherapi.com/v1/current.json?key=a4ab2c97c17d41b8a99154701211304&q=${input}`,
			)
			.then(data => {
				setWeather(data.data);
			})
			.catch(err => console.log(err));
	};
	return (
		<div>
			{weather && (
				<div>
					<input type='text' onChange={weatheInput} />
					<button onClick={searchWeather}>Search city</button>
					<div className='weather-info'>
						<h1>{weather.location.country}</h1>
						<h2>{weather.location.name}</h2>
						<h2>{weather.location.region}</h2>
						<h4>{weather.current.condition.text}</h4>
						<img src={weather.current.condition.icon} alt='' />
						<h4>Weather is {weather.current.temp_c} celsius</h4>
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
