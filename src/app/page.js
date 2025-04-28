'use client'
import Image from "next/image";
// import styles from "./page.module.css";
import Header from "@/component/assets/Header";
import Footer from "@/component/assets/Footer";
import LinkList from "@/component/assets/LinkList";
import './Home.css'

import { db } from '../component/firebase'
import { doc, updateDoc, increment,collection,getDoc } from "firebase/firestore";
import { useState,useEffect } from "react";


export default function Home() {
	const [isLoaded,setIsLoaded]=useState(true)
	const [accessCount,setAccessCount]=useState('')
	const access=async()=>{
		await updateDoc(doc(db, "access", "counter"), {
			count: increment(1)
		});
		await getCount()
	}
	const getCount=async()=>{
		const snap=await getDoc(doc(db, "access", "counter"));
		setAccessCount(snap.data()?.count)
	}
	useEffect(()=>{
		setIsLoaded(sessionStorage.getItem("isLoaded"))
		if(process.env.NODE_ENV==="production"&&(!isLoaded)){
			access()
			setIsLoaded(true)
			sessionStorage.setItem('isLoaded',true)
		}else{
			getCount()
		}
	},[])
	return (
		<>
		<Header/>
		<div className='home__content'>
			<h1>自己紹介</h1>
			<div>名前: Polan</div>
			<div>好きなこと: コンピュータ・プログラミングの勉強</div>
			<div>やりたいこと: 技術ブログの執筆</div>
			{/* links__container links__items links__items-item*/}
			<div className="links__container">
				<h1>リンク</h1>
				<LinkList isHam={false}/>
			</div>
			<div className='accessCounter'>
				<h1>アクセス数</h1>
				{accessCount}
			</div>
		</div>
		<Footer/>
		</>
	)
}
export const dynamic = 'force-dynamic'
