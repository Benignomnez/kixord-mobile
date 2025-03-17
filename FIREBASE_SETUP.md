# Firebase Setup Instructions

To properly set up Firebase authentication in your KIXORD app, follow these steps:

## 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the setup wizard
3. Once your project is created, click "Continue"

## 2. Register Your App with Firebase

1. In your Firebase project dashboard, click the "</>" icon (Web) to add a web app
2. Give your app a nickname (e.g., "KIXORD Mobile")
3. Check "Also set up Firebase Hosting" if you want to host your app
4. Click "Register app"

## 3. Copy Your Firebase Configuration

After registration, you'll see a configuration object like this:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## 4. Update Your Firebase Configuration

Edit the `app/firebase-config.js` file in your project and replace the placeholder values with your actual Firebase configuration.

## 5. Enable Authentication Methods

1. In the Firebase Console, go to "Authentication" in the left sidebar
2. Click on "Get started" or "Sign-in method" tab
3. Enable the authentication methods you want to use (Email/Password, Google, etc.)
4. For Email/Password, be sure to toggle the "Email/Password" option to "Enabled"

## 6. Test Your Authentication

Now your app should be properly configured to use Firebase authentication. Try signing in or creating a new account in your app to test it.

## Troubleshooting

If you encounter issues:

1. Make sure your Firebase configuration in `app/firebase-config.js` is correct
2. Ensure you've enabled the authentication methods you're trying to use
3. Check if your device has a network connection
4. For detailed errors, check the console output when running the app 