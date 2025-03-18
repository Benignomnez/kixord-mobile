// Firebase configuration
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const firebaseConfig = {
    apiKey: "AIzaSyANplaURKPjlavvq8isVMALZkZsnXw3QL0",
    authDomain: "kixord-46877.firebaseapp.com",
    projectId: "kixord-46877",
    storageBucket: "kixord-46877.firebasestorage.app",
    messagingSenderId: "85266887003",
    appId: "1:85266887003:web:5dfcec6e349fe81974aa7e",
    measurementId: "G-YWSNK5S0VK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore
export const db = getFirestore(app); 