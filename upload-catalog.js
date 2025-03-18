const admin = require('firebase-admin');
const fs = require('fs');

// Replace 'serviceAccountKey.json' with the path to your downloaded service account key
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Get Firestore database reference
const db = admin.firestore();

// Read the product catalog from the JSON file
try {
    const catalogData = JSON.parse(fs.readFileSync('./catalog.json', 'utf8'));

    // Function to upload all products to Firebase
    async function uploadProducts() {
        console.log(`Starting upload of ${catalogData.products.length} products...`);

        const batch = db.batch();

        // Add each product to the batch
        catalogData.products.forEach(product => {
            const docRef = db.collection('products').doc(product.id);
            batch.set(docRef, product);
            console.log(`Added product to batch: ${product.name}`);
        });

        // Commit the batch
        await batch.commit();
        console.log('🎉 Success! All products uploaded to Firebase.');
    }

    // Execute the upload
    uploadProducts().catch(error => {
        console.error('❌ Error uploading products:', error);
    });

} catch (error) {
    console.error('❌ Error reading catalog file:', error);
} 