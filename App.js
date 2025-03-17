import 'react-native-gesture-handler';
import React from 'react';
import { LogBox } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppIndex from './app/index';

// Ignore common warnings that don't affect functionality
LogBox.ignoreLogs([
    'VirtualizedLists should never be nested',
    'Non-serializable values were found in the navigation state',
]);

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <AppIndex />
        </GestureHandlerRootView>
    );
} 