// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAhrVezzSyJ2vc3TkJJIs4cfxkFc_Q1apo",
    authDomain: "test1-55871.firebaseapp.com",
    projectId: "test1-55871",
    storageBucket: "test1-55871.appspot.com",
    messagingSenderId: "441745832779",
    appId: "1:441745832779:web:fb5e32fd5c23d3e6d046ce"
  };
// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };