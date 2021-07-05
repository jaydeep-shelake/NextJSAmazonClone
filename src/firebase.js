import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyAz6Cc3aBTD-5uXCIMsmXo7Z9trTjhSAk4",
  authDomain: "amzonclone-36565.firebaseapp.com",
  projectId: "amzonclone-36565",
  storageBucket: "amzonclone-36565.appspot.com",
  messagingSenderId: "449670051451",
  appId: "1:449670051451:web:c7a0fd7d549d4d8d9214de"
  };

  const app = !firebase.apps.length?firebase.initializeApp(firebaseConfig): firebase.app();

  export const db = app.firestore();