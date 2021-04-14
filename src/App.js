import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
	const [weather, setWeather] = useState(null);
	const [input, setInput] = useState('');
	const [time, setTime] = useState([]);
	const [open, setOpen] = useState(false);
	useEffect(() => {
		axios
			.get(
				'https://api.weatherapi.com/v1/current.json?key=a4ab2c97c17d41b8a99154701211304&q=Saint-Petersburg',
			)
			.then(data => {
				setWeather(data.data);
				setTime(data.data.current.last_updated.split(' '));
			})
			.catch(err => console.log(err));
	}, []);
	//event
	const weatheInput = e => {
		setInput(e.target.value);
		if (e.target.value === '') {
			setOpen(!open);
		}
	};
	const searchWeather = e => {
		e.preventDefault();
		axios.interceptors.request.use(test => {
			console.log(`req: ${test}`);
			return test;
		});
		axios
			.get(
				`https://api.weatherapi.com/v1/current.json?key=a4ab2c97c17d41b8a99154701211304&q=${input}`,
			)
			.then(data => {
				setWeather(data.data);
				setTime(data.data.current.last_updated.split(' '));
				if (weather !== '') {
					setOpen(!open);
					// if (!open) {
					// 	setOpen(!open);
					// }
				}
			})
			.catch(err => console.log(err));
	};
	return (
		<div className='container'>
			{weather && (
				<div className='weather'>
					<form action=''>
						<input type='text' onChange={weatheInput} />
						<button onClick={searchWeather}>Search city</button>
					</form>
					<div className={`weather-info ${open ? 'show' : ''}`}>
						<h1>{weather.location.country}</h1>
						<h2>{weather.location.name}</h2>
						<div className='condition'>
							<h4>{weather.current.condition.text}</h4>
							<img src={weather.current.condition.icon} alt='' />
						</div>

						<h4>
							In {time[1]} weather was {weather.current.temp_c} °C
						</h4>
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
