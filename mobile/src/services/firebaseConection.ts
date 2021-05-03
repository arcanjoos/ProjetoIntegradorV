import firebase from "firebase";
import "firebase/database";
import "firebase/auth";
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDT7H_XUDApTIB_pZjAXZGV6O8UQU8H2zM",
    authDomain: "projeto-integrador-v-547f7.firebaseapp.com",
    projectId: "projeto-integrador-v-547f7",
    storageBucket: "projeto-integrador-v-547f7.appspot.com",
    messagingSenderId: "569539095775",
    appId: "1:569539095775:web:89c15eef14669f0809cd6a",
    measurementId: "G-CDE1T1NGYZ"
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
    firebase.firestore().settings({ experimentalForceLongPolling: true });

}

// export async function googleLogar() {

//     const provider = new firebase.auth.GoogleAuthProvider();
//     let result = await firebase.auth().signInWithPopup(provider);
//     return result;
// }

export default firebase;
