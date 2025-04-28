"use client";
import React, { useEffect, useState } from 'react'
import "./Footer.css"

const Footer = () => {
	const [time,setTime]=useState('')
	useEffect(()=>{
		setTime(getTime())
		const interval = setInterval(() => {
			setTime(getTime())
		}, 1000);
		return () => {
				clearInterval(interval);
		};
	},[])
	const getTime=()=>{
		
		const date=new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));
		const y=date.getFullYear()
		const mo=( '00' + date.getMonth() ).slice( -2 )
		const d=( '00' + date.getHours() ).slice( -2 )
		const h=( '00' + date.getHours() ).slice( -2 )
		const mi=( '00' + date.getMinutes() ).slice( -2 )
		const s=( '00' + date.getSeconds() ).slice( -2 )
		return `${y}/${mo}/${d} ${h}:${mi}:${s}`;
	}
	return (
		<footer>
			<h3>{time}</h3>
		</footer>
	)
}

export default Footer