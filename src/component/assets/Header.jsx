"use client";
import React from 'react'
import Link from 'next/link'
import "./Header.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChain,  faHospital, faHouse,faPencil, faSun } from '@fortawesome/free-solid-svg-icons'
import LinkList from '../assets/LinkList'

const Header = () => {
	const toggleHamburger=()=>{
		const menu=document.querySelector('.header__menu')
		const ham=document.querySelector('.header__hamburger')
		ham.classList.toggle('active')
		menu.classList.toggle('active')
	}
	return (

			<div className="header">
				<div className="header__text">
					<Link href="/">
						<h1>
							ホームページ</h1>
					</Link>
				</div>

				<div className="header__menu">
					<LinkList isHam={true}/>
				</div>
				
				<button className="header__hamburger" onClick={toggleHamburger}>
					<span></span>
  				<span></span>
  				<span></span>
				</button>
			</div>

	)
}

export default Header