// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJKP66birhafmmMCMuEWmvRE1NGYDhY_o",
  authDomain: "yoga-master-final-f1ec6.firebaseapp.com",
  projectId: "yoga-master-final-f1ec6",
  storageBucket: "yoga-master-final-f1ec6.appspot.com",
  messagingSenderId: "1088760787133",
  appId: "1:1088760787133:web:d58849d61b5e2481c0c7d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };
