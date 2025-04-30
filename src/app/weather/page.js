'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Weather.css'
import { cityData } from './WeatherID'
//https://weather.tsukumijima.net/
const apiURL="https://weather.tsukumijima.net/api/forecast"
const Weather = () => {
	
	const [city,setCity]=useState(cityData.cityList["東京都"][0])
	const [pref,setPref]=useState("東京都")
	const [region,setRegion]=useState("関東")
	const [cityList,setCityList]=useState(cityData.cityList["東京都"])
	const [prefList,setPrefList]=useState(cityData.prefList["関東"])

	const [weatherData,setWeatherData]=useState([])


	useEffect(()=>{
		axios.get(`${apiURL}/city/${city.id}`)
		.then((res)=>{
			//console.log(res.data)
			console.log(res.data.forecasts[0])
			setWeatherData(res.data.forecasts)
		})
	},[city])
	const selectCity=(event)=>{
		//console.log(event.target.value)
		setCity(cityList.filter(city=>`${city.id}`===event.target.value)[0])
		// setCity({...event.target.value})
	}
	const selectPref=(event)=>{
		// console.log(event.target.value)
		setPref(event.target.value)
		setCityList(cityData.cityList[event.target.value])
		setCity(cityData.cityList[event.target.value][0])
		// setCity({...event.target.value})
	}
	const selectRegion=(event)=>{
		setRegion(event.target.value)
		setPrefList(cityData.prefList[event.target.value])
		setPref(cityData.prefList[event.target.value][0])
		const newPref=cityData.prefList[event.target.value][0]
		setCityList(cityData.cityList[newPref])
		setCity(cityData.cityList[newPref][0])
	}

	return (
		<div className='weather__content'>
			<h1>天気予報</h1>
			<div>
				地方:
				<select onChange={selectRegion} value={region}>
					{cityData.regionList.map((region)=>
						<option key={region} value={region}>{region}</option>
					)}
				</select>
			</div>
			<div>
				都道府県:
				<select onChange={selectPref} value={pref}>
					{prefList.map((pref)=>
						<option key={pref} value={pref}>{pref}</option>
					)}
				</select>
			</div>

			<div>
				都市:
				<select onChange={selectCity} value={city.id}>
					{cityList.map((city)=>
						<option key={city.id} value={city.id}>{city.city}</option>
					)}
				</select>
			</div>
			<div className='weather__forecast'>
			{weatherData.map((data)=>{
				return(
					<div key={data.date} className='weather__block'>
						<div>
					 		<h3>{`${data.dateLabel}(${data.date})`}</h3>
						</div>
						<div className='weather__telop'>
					 		天気：{data.telop}
							 <img src={data.image.url} className='weather__image'/>
						</div>
						<div ></div>
						<div className='weather__temperature'>
							最高気温{data.temperature.max.celsius||'--'}℃・最低気温{data.temperature.min.celsius||'--'}℃
						</div>
						<div >
							降水確率
							<table className='weather__chanceOfRain'>
								<thead>
									<tr>
										<th scope='col'>0-6時</th>
										<th scope='col'>6-12時</th>
										<th scope='col'>12-18時</th>
										<th scope='col'>18-24時</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>{data.chanceOfRain.T00_06}</td>
										<td>{data.chanceOfRain.T06_12}</td>
										<td>{data.chanceOfRain.T12_18}</td>
										<td>{data.chanceOfRain.T18_24}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				)
			})}
			</div>
			<div>
				天気予報API:
				<a href='https://weather.tsukumijima.net/'>
				https://weather.tsukumijima.net/
				</a>
			</div>
		</div>

	)
}

export default Weather