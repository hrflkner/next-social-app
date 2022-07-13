import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyANjIPcLHahu5Zj90n7BR-g8ZK2fQqprfU',
    authDomain: 'stocktickersearch.firebaseapp.com',
    projectId: 'stocktickersearch',
    storageBucket: 'stocktickersearch.appspot.com',
    messagingSenderId: '703518492945',
    appId: '1:703518492945:web:153d8e97b510c70e1924b0',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
