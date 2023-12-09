// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAy5vwneio2fBt4x-j9IaPDL1TIwS0pspM",
  authDomain: "speakscope-frontend-d7e24.firebaseapp.com",
  projectId: "speakscope-frontend-d7e24",
  storageBucket: "speakscope-frontend-d7e24.appspot.com",
  messagingSenderId: "747875901063",
  appId: "1:747875901063:web:3e01fa4e0aec1545c22222",
  measurementId: "G-ZNX9E2FJ18"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export const auth = getAuth(appFirebase);

export default appFirebase