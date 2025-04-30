'use client'
import React, { useState ,useEffect} from 'react'
import { auth,provider } from '../../component/firebaseClient'

import { getAuth,signInWithPopup, signInWithRedirect,getRedirectResult,signOut,onAuthStateChanged } from 'firebase/auth';

import { collection, addDoc,getDocs,deleteDoc,doc,limit,orderBy,query } from "firebase/firestore";
import Cookies from "js-cookie";
import './Board.css'

const Board = () => {
	const [isLogin,setIsLogin]=useState(false)
	const [user,setUser]=useState('名無しさん')
	const [postText,setPostText]=useState('')
	const [postList,setPostList]=useState([])
	const [authUser,setAuthUser]=useState('')
	const login=async()=>{
		try {
			signInWithPopup(auth,provider).then((result)=>{
				localStorage.setItem('isLogin',true)
				setIsLogin(true)
			})
			return
		} catch (error) {
			console.log(error)
		}
	}
	const logout=async()=>{
		signOut(auth).then(()=>{
			localStorage.clear()
			setIsLogin(false)
		})
		return
	}
	const createPost=async()=>{
		if(!user||!postText){
			console.log('投稿できません')
			return
		}
		const body={
			user:user,
			postText:postText,
			author:{
				username:auth.currentUser.displayName,
				id:auth.currentUser.uid
			},
			time:getTime()
		}
		await fetch('/api/board/', {
      method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
      body: JSON.stringify(body),
    })
		getPosts()
		setPostText('')

	}

	const getPosts=async()=>{
		const res=await fetch('/api/board?q=get')
		const data=await res.json()
		setPostList(data.posts||[])
	}
	const handleDelete=async(id)=>{

		await fetch(`/api/board?id=${id}`, {
			method: 'DELETE',
		})
		getPosts()
	}

	const getTime=()=>{
		const date=new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));
		const y=date.getFullYear()
		const mo=( '00' + (date.getMonth()+1) ).slice( -2 )
		const d=( '00' + date.getDate() ).slice( -2 )
		const h=( '00' + date.getHours() ).slice( -2 )
		const mi=( '00' + date.getMinutes() ).slice( -2 )
		const s=( '00' + date.getSeconds() ).slice( -2 )
		return `${y}/${mo}/${d} ${h}:${mi}:${s}`;
		
	}

	useEffect(()=>{
		setIsLogin(localStorage.getItem("isLogin"))
		getPosts()
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setAuthUser(currentUser?.uid)
    });
		return () => unsubscribe();
	},[])


	return (
		<div className='board__content'>
		<h1>掲示板</h1>
		{!isLogin?(
			<>
			<div className='loginMenu'>
				<p>ログインして書き込む</p>
				<button onClick={login}>Googleでログイン</button>
			</div>
			
			</>
		):(
			<>
			<div className='loginMenu'>
				<p>ログアウトする</p>
				<button onClick={logout}>ログアウト</button>
			</div>

			<div className='createPostPage'>
			<div className="postContainer">
				<h1>コメントを投稿する</h1>
				<div className="inputPost">
					<div>ハンドルネーム</div>
					<input type="text" placeholder='タイトルを記入' value={user}
					onChange={(e)=>setUser(e.target.value)}
					/>
				</div>
				<div className="inputPost">
					<div>コメント</div>
					<textarea placeholder='コメントを記入' value={postText}
					onChange={(e)=>setPostText(e.target.value)}/>
				</div>
						<button className='postButton' onClick={createPost}>投稿する</button>
					</div>
				</div>
			</>
		)}
			<div className='postList'>
				{postList.map((post)=>{
					return (
						<div className="postContents" key={post.id}>
								<h3>{post.user}</h3>
								<div className="postTextContainer">
								{post.postText}
								<div className="postTimeContainer">
								<span>{post.time}</span>
								</div>
								</div>
								{post.author.id===authUser&&(
								<button onClick={()=>handleDelete(post.id)}>削除</button>
								)}
						</div>)
				})}
			</div>
		</div>
	)
}

export default Board

export const dynamic = 'force-dynamic'