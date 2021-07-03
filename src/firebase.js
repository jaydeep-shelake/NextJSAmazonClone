import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyA0p7Ri_6X2OcuSxsJTY-lFJP2R60meCUc",
    authDomain: "clone-c77cc.firebaseapp.com",
    projectId: "clone-c77cc",
    storageBucket: "clone-c77cc.appspot.com",
    messagingSenderId: "195009185765",
    appId: "1:195009185765:web:57450dfacff716dc52910c"
  };

  const app = !firebase.apps.length?firebase.initializeApp(firebaseConfig): firebase.app();

  export const db = app.firestore();