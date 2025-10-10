import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {

    apiKey: "AIzaSyDVVweIEZpfV9j7Ij-CYRT5DegzanmJIj8",

    authDomain: "jobmark-440e0.firebaseapp.com",

    projectId: "jobmark-440e0",

    storageBucket: "jobmark-440e0.firebasestorage.app",

    messagingSenderId: "775650349855",

    appId: "1:775650349855:web:d94cb0c7b663145a11962a",

    measurementId: "G-T6CEPN07KT" 

};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export the auth instance
export const auth = getAuth(app);;