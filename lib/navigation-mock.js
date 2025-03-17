'use client';

import React from 'react';

// Mock NavigationContainer
export const NavigationContainer = ({ children }) => {
    return <div className="navigation-container">{children}</div>;
};

// Mock createStackNavigator
export function createStackNavigator() {
    return {
        Navigator: ({ children, screenOptions }) => (
            <div className="stack-navigator">{children}</div>
        ),
        Screen: ({ name, component: Component, options, children }) => {
            return children || <div id={`screen-${name}`}></div>;
        },
    };
}

// Mock createBottomTabNavigator
export function createBottomTabNavigator() {
    return {
        Navigator: ({ children, screenOptions }) => (
            <div className="tab-navigator">{children}</div>
        ),
        Screen: ({ name, component: Component, options }) => {
            return <div id={`tab-${name}`}></div>;
        },
    };
}

// Mock navigation hooks
export function useNavigation() {
    return {
        navigate: (screen, params) => console.log(`Navigate to ${screen}`, params),
        goBack: () => console.log('Go back'),
        setOptions: (options) => console.log('Set options', options),
    };
}

export function useRoute() {
    return {
        params: {},
        name: 'MockScreen',
    };
}

// Mock more navigation utilities as needed
export const getAuth = () => ({
    currentUser: null,
});

export const onAuthStateChanged = (auth, callback) => {
    // Simulate no user logged in
    callback(null);
    return () => { }; // Return a cleanup function
};

// Firebase mock
export const initializeApp = (config) => ({
    // Mock Firebase app
});

export const getFirestore = () => ({
    // Mock Firestore
});

export const collection = () => ({
    // Mock collection
});

export const getDocs = async () => ({
    docs: [],
});

export const addDoc = async () => ({
    id: 'mock-id',
});

export const updateDoc = async () => { };
export const deleteDoc = async () => { }; 