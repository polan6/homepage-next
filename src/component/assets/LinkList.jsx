"use client";
import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChain,  faCommentDots,  faHospital, faHouse,faPencil, faQ, faSun } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import "./LinkList.css"

const LinkList = ({isHam}) => {
	const toggleHamburger=()=>{
		const menu=document.querySelector('.header__menu')
		const ham=document.querySelector('.header__hamburger')
		ham.classList.toggle('active')
		menu.classList.toggle('active')
	}
	{/* links__container links__items links__items-item*/}
	return (
		
		<ul className={isHam?'header__menu-items':"links__items"}>
			<li className={isHam?'header__menu-items-item':"links__items-item"}>
				<Link href="/" onClick={isHam?toggleHamburger:()=>{}}>
					<FontAwesomeIcon icon={faHouse} />
					ホーム
				</Link>
			</li>
			<li className={isHam?'header__menu-items-item':"links__items-item"}>
				<Link href="/board" onClick={isHam?toggleHamburger:()=>{}}>
					<FontAwesomeIcon icon={faPencil} />
					掲示板
				</Link>
			</li>
			{/* <li className={isHam?'header__menu-items-item':"links__items-item"}>
				<Link to="/weather" onClick={isHam?toggleHamburger:()=>{}}>
					<FontAwesomeIcon icon={faSun} />
					天気予報
				</Link>
			</li> */}
			<li className={isHam?'header__menu-items-item':"links__items-item"}>
				<Link href="/depression" onClick={isHam?toggleHamburger:()=>{}}>
					<FontAwesomeIcon icon={faHospital} />
					うつ病チェック
				</Link>
			</li>
			{/* <li className={isHam?'header__menu-items-item':"links__items-item"}>
				<Link to="/periodictable" onClick={isHam?toggleHamburger:()=>{}}>
					<FontAwesomeIcon icon={faHospital} />
					元素周期表
				</Link>
			</li> */}
			{/* <li className={isHam?'header__menu-items-item':"links__items-item"}>
				<Link to="/interview" onClick={isHam?toggleHamburger:()=>{}}>
					<FontAwesomeIcon icon={faCommentDots} />
					技術面接質問集
				</Link>
			</li> */}
			<li className={isHam?'header__menu-items-item':"links__items-item"}>
				<a href="https://github.com/polan6/homepage" onClick={isHam?toggleHamburger:()=>{}}>
					<FontAwesomeIcon icon={faGithub} />
					GitHub
				</a>
			</li>
			<li className={isHam?'header__menu-items-item':"links__items-item"}>
				<a href="https://qiita.com/Polan" onClick={isHam?toggleHamburger:()=>{}}>
					<FontAwesomeIcon icon={faQ} />
					Qiita
				</a>
			</li>
		</ul>

	
	)
}

export default LinkList