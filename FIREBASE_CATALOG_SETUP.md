# Firebase Product Catalog Setup

This guide explains how to upload your KIXORD sneaker catalog to Firebase Firestore.

## Prerequisites

1. Node.js installed on your computer
2. Firebase project created (your project ID: kixord-46877)
3. Firebase Admin SDK credentials

## Step 1: Get Firebase Admin Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/project/kixord-46877/settings/serviceaccounts/adminsdk)
2. Click on your project (kixord-46877)
3. Go to Project settings → Service accounts
4. Click "Generate new private key"
5. Save the downloaded JSON file as `serviceAccountKey.json` in the same folder as this guide

## Step 2: Prepare Your Files

Ensure you have these files in the same directory:
- `catalog.json` (your product catalog)
- `serviceAccountKey.json` (your Firebase credentials)
- `upload-catalog.js` (the upload script)

## Step 3: Install Dependencies

Open a terminal or command prompt in this directory and run:

```
npm install firebase-admin
```

## Step 4: Run the Upload Script

In the terminal, run:

```
node upload-catalog.js
```

You should see progress messages for each product, and finally a success message when all products are uploaded.

## Step 5: Verify in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Open your project
3. Go to Firestore Database
4. You should see a "products" collection with all your sneakers

## Troubleshooting

- If you see "Error: Cannot find module './serviceAccountKey.json'", make sure you've downloaded the credentials file and named it correctly
- If you see permission errors, ensure your service account has Firestore write permissions
- For other errors, check the Firebase console logs for details

## Next Steps

Now that your catalog is uploaded to Firebase, you can:
1. Connect your KIXORD app to display products from Firebase
2. Set up Cloud Functions to manage inventory
3. Create admin tools to manage your product catalog 