import { db,auth,provider,admin} from '../../../component/firebase'
import { signInWithPopup,signOut } from 'firebase/auth'

const getPosts=async()=>{
	const data=await getDocs(query(collection(db, "posts"), orderBy("time", "desc"), limit(20)));
	setPostList()
	// console.log(postList)
}

export async function GET(req) {
  try {
		const { searchParams } = new URL(req.url);
		const snapshot = await db
		.collection("posts")
		.orderBy("time", "desc")
		.limit(20)
		.get();
		const posts = snapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data(),
		}));
    return Response.json({posts:posts,uid:auth.currentUser?.uid})
  } catch (error) {
    console.log('Error fetching user data:', error);
    return Response.json({ data: [] }, { status: 500 })
  }
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
			username:auth.currentUser?.displayName,
			id:auth.currentUser?.uid
		},
		time:getTime()
	});
	getPosts()
	setPostText('')

}
export async function POST(req) {
	try {

		const body=await req.json()
		const newPostRef = db.collection('posts').doc(); // 新しいドキュメントを作成（自動的にIDが生成される）
		
		await newPostRef.set(body)
		return Response.json({ msg:'success' }, { status: 200 })
	} catch (error) {
		console.log(error)
		return Response.json({ msg:'failure' }, { status: 500 })
	}
}

const handleDelete=async(id)=>{
	await deleteDoc(doc(db, 'posts', id));

	//window.location.href='/'
}
export async function DELETE(req) {
	try {
		const { searchParams } = new URL(req.url);
		const id = searchParams.get("id");
		await db.collection('posts').doc(id).delete();
		return Response.json({ msg:'success' }, { status: 200 })
	} catch (error) {
		return Response.json({ msg:'failure' }, { status: 500 })
	}
}

