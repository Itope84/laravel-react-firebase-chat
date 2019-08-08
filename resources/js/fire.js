import firebase from "firebase/app";
import "firebase/database";

var config = {
    apiKey: "AIzaSyB720USlrTRdFBWKcMgkQe8SnkpSVuqc1k",
    authDomain: "larareact-chat.firebaseapp.com",
    databaseURL: "https://larareact-chat.firebaseio.com",
    projectId: "larareact-chat",
    storageBucket: "",
    messagingSenderId: "1082256924638",
    appId: "1:1082256924638:web:b4d9c0e0473698c0"
};

var fire = firebase.initializeApp(config);
export default fire;
