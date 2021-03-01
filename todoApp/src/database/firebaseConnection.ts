import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAIRJLCp2ZWucGQw8ttyCC-hVpZIdQEFKk",
  authDomain: "meuapp-f1bcb.firebaseapp.com",
  projectId: "meuapp-f1bcb",
  storageBucket: "meuapp-f1bcb.appspot.com",
  messagingSenderId: "742589614032",
  appId: "1:742589614032:web:4d5cc2741316a001119bd5",
  measurementId: "G-XKEK34T32T"
};

if(!firebase.apps.length)
  firebase.initializeApp(firebaseConfig);

export default firebase;