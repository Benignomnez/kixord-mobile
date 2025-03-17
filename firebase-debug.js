// Firebase Debug Script
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");

// Import Firebase config manually
const firebaseConfig = {
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
const auth = getAuth(app);

// Check if Firebase is correctly initialized
console.log("Firebase initialization successful:", !!app);
console.log("Firebase auth service initialized:", !!auth);
console.log("Firebase config:", {
    apiKey: firebaseConfig.apiKey ? "Present" : "Missing",
    authDomain: firebaseConfig.authDomain ? "Present" : "Missing",
    projectId: firebaseConfig.projectId ? "Present" : "Missing",
    storageBucket: firebaseConfig.storageBucket ? "Present" : "Missing",
    messagingSenderId: firebaseConfig.messagingSenderId ? "Present" : "Missing",
    appId: firebaseConfig.appId ? "Present" : "Missing",
});

console.log("\nTo fix authentication issues:");
console.log("1. Go to Firebase Console: https://console.firebase.google.com/project/kixord-46877/authentication/providers");
console.log("2. Click on the 'Sign-in method' tab");
console.log("3. Enable 'Email/Password' provider by clicking on it and toggling the switch");
console.log("4. Click 'Save'");
console.log("5. Restart your Expo app with 'npx expo start --clear'"); 