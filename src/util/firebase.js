import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCiG4pD9n6dn0sDZ-QFLWh1UwPxYTacnEI",
    authDomain: "ads-media-e2a9c.firebaseapp.com",
    projectId: "ads-media-e2a9c",
    storageBucket: "ads-media-e2a9c.appspot.com",
    messagingSenderId: "720859971772",
    appId: "1:720859971772:web:c172b53ec05a425a32d0b9",
    measurementId: "G-KKQSGDK4EK"
  };

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };