import { db,admin} from '../../../component/firebase'
import { doc, updateDoc, increment,collection,getDoc } from "firebase/firestore";

const getCountWithAccess=async()=>{
	const docRef = db.collection("access").doc("counter");
	await docRef.update({
		count: admin.firestore.FieldValue.increment(1)
	});
	// await updateDoc(doc(db, "access", "counter"), {
	// 	count: increment(1)
	// });
	return await getCount()
}
const getCount=async()=>{
	const docRef = db.collection("access").doc("counter");
	const snap = await docRef.get();
	//const snap=await getDoc(doc(db, "access", "counter"));
	return snap.data()?.count
}

export async function GET(req) {
  try {
		const { searchParams } = new URL(req.url);
		const isIncrement = searchParams.get("i");
		let count

		if(isIncrement==='1'){
			count=await getCountWithAccess()
		}else{
			count=await getCount()
		}
    return Response.json({count:count})
  } catch (error) {
    console.log('Error fetching user data:', error);
    return Response.json({ count: 'アクセスカウンターが表示できません' }, { status: 500 })
  }
}

