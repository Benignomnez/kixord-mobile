'use client';

import ReactNativeMock from './react-native-web-mock';

// Export all mock components
export const {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Platform,
    Dimensions,
    Animated,
    ActivityIndicator,
    Image,
    TextInput,
    FlatList,
    StatusBar,
} = ReactNativeMock;

// Export other utilities
export const useColorScheme = () => 'light';
