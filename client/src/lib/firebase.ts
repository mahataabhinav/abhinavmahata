// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB6u8kjcChZ6bQE7xGSqNx9h30uvek7YNc",
    authDomain: "abhinavmahata-b2af7.firebaseapp.com",
    projectId: "abhinavmahata-b2af7",
    storageBucket: "abhinavmahata-b2af7.firebasestorage.app",
    messagingSenderId: "81263541178",
    appId: "1:81263541178:web:4cb7f0bc0e1c786b6cfb83",
    measurementId: "G-W71YJPBGV3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export { analytics };
