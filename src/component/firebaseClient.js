import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB1x6aOUfLL17gtvyH9D6iS89Hmxm6_qNg",
  authDomain: "homepage-board-88e25.firebaseapp.com",
  projectId: "homepage-board-88e25",
  storageBucket: "homepage-board-88e25.firebasestorage.app",
  messagingSenderId: "775580599019",
  appId: "1:775580599019:web:b8734c86dac0c1e0cf34ae",
  measurementId: "G-21TRLLP7JW"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth,provider };