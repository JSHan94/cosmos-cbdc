import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/analytics"

const firebaseConfig = {
    // JH firebase
  //   apiKey: "AIzaSyDCgtdgWyKEWrjfDzjgnqfrzcgsvUnSxJ0",
  // authDomain: "hana2-4fe43.firebaseapp.com",
  // projectId: "hana2-4fe43",
  // storageBucket: "hana2-4fe43.appspot.com",
  // messagingSenderId: "481965009550",
  // appId: "1:481965009550:web:7f7119d6ae91ed08b737df"
    apiKey: "AIzaSyAosfEbUKtEIb20RZSJGPvKEmSnSoIWVH4",
    authDomain: "hana-cbdc2.firebaseapp.com",
    projectId: "hana-cbdc2",
    storageBucket: "hana-cbdc2.appspot.com",
    messagingSenderId: "342269223222",
    appId: "1:342269223222:web:6c367ce8e24320a2045397",
    measurementId: "G-6KCXMHTMC3"
  };


firebase.initializeApp(firebaseConfig);


export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();
export const analyticService = firebase.analytics();