import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore';
import { db } from '../firebase-config';

// Fetch all products
export const fetchAllProducts = async () => {
    try {
        const productsCollection = collection(db, 'products');
        const productsSnapshot = await getDocs(productsCollection);

        const products = [];
        productsSnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() });
        });

        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

// Fetch a single product by ID
export const fetchProductById = async (productId) => {
    try {
        const productDoc = doc(db, 'products', productId);
        const productSnapshot = await getDoc(productDoc);

        if (productSnapshot.exists()) {
            return { id: productSnapshot.id, ...productSnapshot.data() };
        } else {
            console.error(`Product with ID ${productId} not found`);
            return null;
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
};

// Fetch products by category
export const fetchProductsByCategory = async (category) => {
    try {
        const productsCollection = collection(db, 'products');
        const q = query(productsCollection, where('description', '==', category));
        const querySnapshot = await getDocs(q);

        const products = [];
        querySnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() });
        });

        return products;
    } catch (error) {
        console.error('Error fetching products by category:', error);
        return [];
    }
};

// Fetch new products
export const fetchNewProducts = async () => {
    try {
        const productsCollection = collection(db, 'products');
        const q = query(productsCollection, where('isNew', '==', true));
        const querySnapshot = await getDocs(q);

        const products = [];
        querySnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() });
        });

        return products;
    } catch (error) {
        console.error('Error fetching new products:', error);
        return [];
    }
}; 