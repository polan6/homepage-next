'use client'
import React, { useState ,useEffect} from 'react'
import { auth,provider,db } from '../../component/firebase'
import { signInWithPopup,signOut } from 'firebase/auth'
import { collection, addDoc,getDocs,deleteDoc,doc,limit,orderBy,query } from "firebase/firestore";
import './Board.css'

const Board = () => {
	const [isLogin,setIsLogin]=useState(false)
	const [user,setUser]=useState('名無しさん')
	const [postText,setPostText]=useState('')
	const [postList,setPostList]=useState([])
	
	const login=()=>{
		signInWithPopup(auth,provider).then((result)=>{
			localStorage.setItem('isLogin',true)
			setIsLogin(true)
		})
	}
	const logout=()=>{
		signOut(auth).then(()=>{
			localStorage.clear()
			setIsLogin(false)
		})
	}
	const createPost=async()=>{
		if(!user||!postText){
			console.log('投稿できません')
			return
		}
		await addDoc(collection(db, "posts"), {
			user:user,
			postText:postText,
			author:{
				username:auth.currentUser.displayName,
				id:auth.currentUser.uid
			},
			time:getTime()
		});
		getPosts()
		setPostText('')

	}

	const getPosts=async()=>{
		const data=await getDocs(query(collection(db, "posts"), orderBy("time", "desc"), limit(20)));
		//const data=await getDocs(collection(db, "posts"));
		//console.log(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
		// console.log(data)
		setPostList(data.docs
			// .filter((doc)=>{doc.data().author})
			.map((doc)=>{
				// console.log(doc.data())
				return {...doc.data(),id:doc.id}
			}))
		// console.log(postList)
	}
	const getTime=()=>{
		const date=new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));
		const y=date.getFullYear()
		const mo=( '00' + (date.getMonth()+1) ).slice( -2 )
		const d=( '00' + date.getDate() ).slice( -2 )
		const h=( '00' + date.getHours() ).slice( -2 )
		const mi=( '00' + date.getMinutes() ).slice( -2 )
		const s=( '00' + date.getSeconds() ).slice( -2 )
		console.log(`${y}/${mo}/${d} ${h}:${mi}:${s}`)
		return `${y}/${mo}/${d} ${h}:${mi}:${s}`;
		
	}

	useEffect(()=>{
		setIsLogin(localStorage.getItem("isLogin"))
		getPosts()
		// console.log(postList)
	},[])
	const handleDelete=async(id)=>{
		await deleteDoc(doc(db, 'posts', id));
		getPosts()
		//window.location.href='/'
	}

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

					{post.author.id===auth.currentUser?.uid&&(
					<button onClick={()=>handleDelete(post.id)}>削除</button>
					)}

				
			</div>
				)
			})}

		</div>
		</div>
	)
}

export default Board