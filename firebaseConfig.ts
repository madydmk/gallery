// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import * as firebase from "firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfigs = {
  apiKey: "AIzaSyCeUPGhEv6tawN0_oUJF5wUovLXouuLwjw",
  authDomain: "gallery-2993a.firebaseapp.com",
  projectId: "gallery-2993a",
  storageBucket: "gallery-2993a.appspot.com",
  messagingSenderId: "22460173363",
  appId: "1:22460173363:web:35dd00e05541738d26e746",
};
const app = !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();
if (!app.apps.length) {
  app.initializeApp({});
}
// Initialize Firebase
