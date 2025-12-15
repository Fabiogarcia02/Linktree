

import { initializeApp } from "firebase/app";
import{getFirestore} from 'firebase/firestore'
import{getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBcXtd77USd9WeBXzS5GdiTERFTb3fN-Qc",
  authDomain: "react-links-7d56d.firebaseapp.com",
  projectId: "react-links-7d56d",
  storageBucket: "react-links-7d56d.firebasestorage.app",
  messagingSenderId: "923541829116",
  appId: "1:923541829116:web:d41139ab3e7fdb95ffae79"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db= getFirestore(app);
export{auth,db};