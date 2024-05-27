// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByjLwYrdwkSm5VCxXGIJYqIWB08dSdDUY",
  authDomain: "jobseeker-619.firebaseapp.com",
  projectId: "jobseeker-619",
  storageBucket: "jobseeker-619.appspot.com",
  messagingSenderId: "894420558250",
  appId: "1:894420558250:web:844582222f70318a6c4bd3",
  measurementId: "G-YJ74TSMYVV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore();

export { app, auth, db };
