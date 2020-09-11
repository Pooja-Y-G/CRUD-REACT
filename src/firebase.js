import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAab1a1Gvly2mOakySi6BqIx1VFtGWkdVY",
  authDomain: "react-crud-95e97.firebaseapp.com",
  databaseURL: "https://react-crud-95e97.firebaseio.com",
  projectId: "react-crud-95e97",
  storageBucket: "react-crud-95e97.appspot.com",
  messagingSenderId: "458396017257",
  appId: "1:458396017257:web:440ba080b5a8a3bcad78f8",
};
// Initialize Firebase
var firedb = firebase.initializeApp(firebaseConfig);

export default firedb.database().ref();
