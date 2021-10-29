import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/analytics"

const firebaseConfig = {
    // JH firebase
    // apiKey: "AIzaSyCSl6umMzO_KuVpSvltljlSn0RZXF55Uqg",
    // authDomain: "hana-cbdc.firebaseapp.com",
    // projectId: "hana-cbdc",
    // storageBucket: "hana-cbdc.appspot.com",
    // messagingSenderId: "783782723412",
    // appId: "1:783782723412:web:5ef3d75feff4709196d2c1",
    // measurementId: "G-71S4Y5PH75"
    apiKey: "AIzaSyDCgtdgWyKEWrjfDzjgnqfrzcgsvUnSxJ0",
  authDomain: "hana2-4fe43.firebaseapp.com",
  projectId: "hana2-4fe43",
  storageBucket: "hana2-4fe43.appspot.com",
  messagingSenderId: "481965009550",
  appId: "1:481965009550:web:7f7119d6ae91ed08b737df"
  };


firebase.initializeApp(firebaseConfig);


export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();
export const analyticService = firebase.analytics();