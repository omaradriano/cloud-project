// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgwxVvJPA5prSYZoJvxrjMlyESwsvoXco",
  authDomain: "bisondocx.firebaseapp.com",
  projectId: "bisondocx",
  storageBucket: "bisondocx.appspot.com",
  messagingSenderId: "118417567070",
  appId: "1:118417567070:web:27f286938a1ed95be9f3cf"
};

// Initialize Firebase
const InitializeAuth = initializeApp(firebaseConfig);

export default InitializeAuth