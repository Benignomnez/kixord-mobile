"use client"

import { useEffect, useState } from "react"
import { View, StyleSheet, StatusBar, ActivityIndicator } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"
import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged } from "firebase/auth"

// Screens
import OnboardingScreen from "./screens/onboarding-screen"
import ShopScreen from "./screens/shop-screen"
import ProductDetailScreen from "./screens/product-detail-screen"
import CartScreen from "./screens/cart-screen"
import ProfileScreen from "./screens/profile-screen"
import AuthScreen from "./screens/auth-screen"
import FavoritesScreen from "./screens/favorites-screen"
import SearchScreen from "./screens/search-screen"
import CheckoutScreen from "./screens/checkout-screen"
import OrderConfirmationScreen from "./screens/order-confirmation-screen"
import OrderTrackingScreen from "./screens/order-tracking-screen"

// Firebase configuration
const firebaseConfig = {
  // Your Firebase config will go here
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "Shop") {
            iconName = focused ? "home" : "home-outline"
          } else if (route.name === "Favorites") {
            iconName = focused ? "heart" : "heart-outline"
          } else if (route.name === "Cart") {
            iconName = focused ? "cart" : "cart-outline"
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline"
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "#E32636",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Shop" component={ShopScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

export default function App() {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState(null)
  const [showOnboarding, setShowOnboarding] = useState(true)

  // Handle user state changes
  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => {
      setUser(user)
      if (initializing) setInitializing(false)
    })
    return subscriber
  }, [])

  if (initializing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E32636" />
      </View>
    )
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {showOnboarding ? (
          <Stack.Screen name="Onboarding">
            {(props) => <OnboardingScreen {...props} finishOnboarding={() => setShowOnboarding(false)} />}
          </Stack.Screen>
        ) : user ? (
          <>
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetailScreen}
              options={{
                headerShown: true,
                headerTitle: "Details",
                headerTitleAlign: "center",
                headerShadowVisible: false,
                headerStyle: {
                  backgroundColor: "#FFFFFF",
                },
              }}
            />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
            <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} />
            <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
})

