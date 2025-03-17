"use client";

import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import WhatsAppWidget from "../components/whatsapp-widget";

// Sample data
const categories = [
  { id: "1", name: "Run" },
  { id: "2", name: "Athletic" },
  { id: "3", name: "Hot Deals" },
  { id: "4", name: "Exclusive" },
];

const products = [
  {
    id: "1",
    name: "LIGHTWEIGHT RUNNING CASUAL SNEAKERS SHOE",
    price: 250.0,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640",
    isNew: true,
    category: "Man Sneakers - 7,8",
  },
  {
    id: "2",
    name: "URBAN STREET STYLE PREMIUM SNEAKERS",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640",
    isNew: true,
    category: "Man Sneakers - 8,9",
  },
  {
    id: "3",
    name: "CLASSIC RETRO ATHLETIC SHOES",
    price: 175.5,
    image:
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640",
    isNew: false,
    category: "Man Sneakers - 9,10",
  },
  {
    id: "4",
    name: "PREMIUM COMFORT WALKING SHOES",
    price: 220.0,
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640",
    isNew: false,
    category: "Man Sneakers - 8,9,10",
  },
];

const ShopScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState("1");
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter((id) => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.id && styles.selectedCategoryItem,
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item.id && styles.selectedCategoryText,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate("ProductDetail", { product: item })}
    >
      {item.isNew && (
        <View style={styles.newBadge}>
          <Text style={styles.newBadgeText}>New</Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(item.id)}
      >
        <Ionicons
          name={favorites.includes(item.id) ? "heart" : "heart-outline"}
          size={24}
          color={favorites.includes(item.id) ? "#E32636" : "#000"}
        />
      </TouchableOpacity>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        <Text style={styles.productCategory}>{item.category}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>KIXORD</Text>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => navigation.navigate("Search")}
        >
          <Ionicons name="search" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesList}
      />

      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productsGrid}
      />

      <WhatsAppWidget
        phoneNumber="18499255780"
        companyName="KIXORD"
        message="Hi! I'm interested in your sneakers."
        position="bottomRight"
        welcomeMessage="👋 Welcome to KIXORD! How can we help you find the perfect sneakers today?"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  categoriesList: {
    maxHeight: 50,
    marginBottom: 10,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: "#333",
    marginLeft: 10,
  },
  selectedCategoryItem: {
    backgroundColor: "#FFFFFF",
  },
  categoryText: {
    color: "#FFFFFF",
    fontWeight: "500",
  },
  selectedCategoryText: {
    color: "#000000",
    fontWeight: "bold",
  },
  productsGrid: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  productCard: {
    flex: 1,
    margin: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: "relative",
  },
  newBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#E32636",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 1,
  },
  newBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
    height: 40,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#E32636",
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 12,
    color: "#666",
  },
});

export default ShopScreen;
