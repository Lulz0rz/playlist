import firebase from 'firebase/app';
import firebaseConfig from '../config/firebase';

import 'firebase/auth';
import 'firebase/database';

export default class FirebaseService {

  constructor() {
    this.firebase = firebase.initializeApp(firebaseConfig);
  }

  get() {
    return this.firebase;
  }

  getDatabase() {
    return this.firebase.database();
  }

  getGoogleAuthProvider() {
    return new firebase.auth.GoogleAuthProvider();
  }

}
