import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDDLdN-qb_Eh8nXTtbZx4JHrp6ZbBCMfi8",
  authDomain: "otp-next-shop.firebaseapp.com",
  projectId: "otp-next-shop",
  storageBucket: "otp-next-shop.appspot.com",
  messagingSenderId: "695584630734",
  appId: "1:695584630734:web:8cddc8f8077de52ca7ed9f",
  measurementId: "G-42Q3WFK8CH",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export default firebase;
