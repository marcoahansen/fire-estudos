import { initializeApp } from 'firebase/app'


const firebaseConfig = {
    apiKey: "AIzaSyA_L-dW2AGJZmAKEQ6YekhtxSSCK44aQo0",
    authDomain: "estudos-c7a72.firebaseapp.com",
    projectId: "estudos-c7a72",
    storageBucket: "estudos-c7a72.appspot.com",
    messagingSenderId: "1078933552635",
    appId: "1:1078933552635:web:c0ffbb096b808a39345f5e",
    measurementId: "G-XWX7ZWFP16"
  };
  
  const firebase = initializeApp(firebaseConfig);

  export default firebase;