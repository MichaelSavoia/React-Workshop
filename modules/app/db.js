import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCHPmXCY67uu6BKx0lCwSv56qv4-gZspJA',
  authDomain: 'workshop-4596d.firebaseapp.com',
  databaseURL: 'https://workshop-4596d.firebaseio.com',
  projectId: 'workshop-4596d',
  storageBucket: 'workshop-4596d.appspot.com',
  messagingSenderId: '451146459037',
  appId: '1:451146459037:web:8a73fe9992d77d74dc7174',
  measurementId: 'G-SSKHLVFSC3'
};

firebase.initializeApp(config);

export const db = firebase.firestore();

export const auth = () => firebase.auth();

export const mode = 'real';
