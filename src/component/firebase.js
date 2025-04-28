
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyB1x6aOUfLL17gtvyH9D6iS89Hmxm6_qNg", //firebaseのapiキーは公開を前提としている
  authDomain: "homepage-board-88e25.firebaseapp.com",
  projectId: "homepage-board-88e25",
  storageBucket: "homepage-board-88e25.firebasestorage.app",
  messagingSenderId: "775580599019",
  appId: "1:775580599019:web:b8734c86dac0c1e0cf34ae",
  measurementId: "G-21TRLLP7JW"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth=getAuth(app)
const provider=new GoogleAuthProvider()
const db=getFirestore(app)
export{auth,provider,db}