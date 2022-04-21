// Import the functions you need from the SDKs you need
import firebase from 'firebase'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDK_09R7ClfaV4oJGEEH3QOKy1xM6ElEg8",
  authDomain: "payapp-c0567.firebaseapp.com",
  databaseURL: "https://payapp-c0567-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "payapp-c0567",
  storageBucket: "payapp-c0567.appspot.com",
  messagingSenderId: "692469033900",
  appId: "1:692469033900:web:685465f84ecda53e336809",
  measurementId: "G-DWMSTMK85H"
};

// Initialize Firebase



const app = initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const db = firebaseApp.firestore();
export const database = firebase.database();
export const storage = firebase.storage();
export { auth, provider };
export default db;
