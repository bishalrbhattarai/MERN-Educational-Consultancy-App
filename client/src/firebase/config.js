// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyByk2Iqd_FDDY4gTzyC202-YexUOi1L_Kk",
  authDomain: "asahi-consultancy.firebaseapp.com",
  projectId: "asahi-consultancy",
  storageBucket: "asahi-consultancy.appspot.com",
  messagingSenderId: "1025759323733",
  appId: "1:1025759323733:web:7f3c215c76e9b9dbbbd6dc",
  measurementId: "G-S6NT4CREBY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
