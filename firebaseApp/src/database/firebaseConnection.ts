import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
  // Configurações do firebase
};

if(!firebase.apps.length)
  firebase.initializeApp(firebaseConfig);

export default firebase;
