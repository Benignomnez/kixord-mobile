# KIXORD Firebase Integration Guide

This guide explains how to integrate your product catalog with Firebase and connect it to your KIXORD app.

## 1. Upload Your Catalog to Firebase

### Prerequisites
- Node.js installed
- Firebase project set up (kixord-46877)
- Service account key for Firebase Admin SDK

### Steps to Upload

1. **Download your service account key**:
   - Go to Firebase Console → Project Settings → Service Accounts
   - Click "Generate new private key"
   - Save as `serviceAccountKey.json` in your project root

2. **Prepare your files**:
   - `catalog.json` - Your product catalog
   - `upload-catalog.js` - The upload script
   - `serviceAccountKey.json` - Your Firebase credentials

3. **Run the upload script**:
   ```
   node upload-catalog.js
   ```

## 2. Connect Your App to Firebase

### Update Firebase Configuration

Ensure your Firebase configuration in `app/firebase-config.js` is correct:

```javascript
export const firebaseConfig = {
  apiKey: "AIzaSyANplaURKPjlavvq8isVMALZkZsnXw3QL0",
  authDomain: "kixord-46877.firebaseapp.com",
  projectId: "kixord-46877",
  storageBucket: "kixord-46877.firebasestorage.app",
  messagingSenderId: "85266887003",
  appId: "1:85266887003:web:5dfcec6e349fe81974aa7e",
  measurementId: "G-YWSNK5S0VK"
};
```

### Initialize Firestore in Your App

Make sure you're initializing Firestore in your app. In `app/firebase-config.js`:

```javascript
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
```

## 3. Test Your Integration

1. **Start your app**:
   ```
   npx expo start --clear
   ```

2. **Verify products load**:
   - Open your app on a device
   - Navigate to the shop screen
   - You should see products loading from Firebase
   - Test filtering by category

## 4. Troubleshooting

### Common Issues:

1. **"Firebase is not initialized" error**:
   - Check that you have properly initialized Firebase before using any Firebase services

2. **"Missing or insufficient permissions" error**:
   - Check your Firebase security rules in the Firebase console
   - Make sure your service account has proper permissions

3. **Images not loading**:
   - Check that your image URLs are accessible
   - Try opening them in a browser to verify

4. **"Network error" when fetching products**:
   - Verify your internet connection
   - Check your Firebase configuration values

## 5. WhatsApp Widget Integration

Now that your products are in Firebase, you can enhance your WhatsApp widget to:

1. **Create dynamic product queries**:
   - Allow users to ask about products by name
   - Send catalog filters to your WhatsApp API

2. **Send product information via WhatsApp**:
   - Share product details directly through WhatsApp
   - Create product cards with images and prices

To implement these features, you'll need to:
1. Set up WhatsApp Business API
2. Create a server to handle WhatsApp queries
3. Connect your server to your Firebase database

## 6. Next Steps

1. **Enhance product details**:
   - Add more detailed descriptions
   - Include more product images
   - Add specifications and features

2. **Implement a shopping cart with Firebase**:
   - Create a cart collection in Firestore
   - Add functions to add/remove items
   - Sync cart across devices

3. **Add user authentication**:
   - Allow users to create accounts
   - Save favorites and order history
   - Implement personalized recommendations

By following these steps, you've successfully integrated your product catalog with Firebase and connected it to your KIXORD app! 