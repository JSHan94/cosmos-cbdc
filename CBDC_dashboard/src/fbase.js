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
    apiKey: "AIzaSyDDR3w67qlcY1q_4RB_BuIF2Vnr_o5rOfc",
    authDomain: "test1-df918.firebaseapp.com",
    projectId: "test1-df918",
    storageBucket: "test1-df918.appspot.com",
    messagingSenderId: "222451457019",
    appId: "1:222451457019:web:7f2fafe2f23ec65820495e",
    measurementId: "G-R81TK5D4HW"
  };


firebase.initializeApp(firebaseConfig);


export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();
export const analyticService = firebase.analytics();