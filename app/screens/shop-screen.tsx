"use client";

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  fetchAllProducts,
  fetchProductsByCategory,
} from "../utils/firebase-products";
import { getValidImageUrl, preloadImages } from "../utils/image-utils";
import ProductItem from "../components/ProductItem";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase-config";
import {
  getAllProducts,
  forceSync,
  clearProductCache,
} from "../utils/dynamic-data-sync";

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();

// Categories data
const categories = [
  { id: "all", name: "All", icon: "apps" },
  { id: "running", name: "Running", icon: "directions-run" },
  { id: "walking", name: "Walking", icon: "directions-walk" },
  { id: "basketball", name: "Basketball", icon: "sports-basketball" },
];

// Add interface for component props
interface ShopScreenProps {
  navigation: any;
  route: any;
}

const ShopScreen = ({ navigation, route }: ShopScreenProps) => {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Check if a category was passed from navigation params
  useEffect(() => {
    if (route.params?.category) {
      setSelectedCategory(route.params.category);
    }
  }, [route.params]);

  // Load products
  useEffect(() => {
    loadProducts();
  }, []);

  // Filter products when category or products change
  useEffect(() => {
    if (products.length > 0) {
      filterProductsByCategory(selectedCategory, products);
    }
  }, [selectedCategory, products]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Loading all products directly from Firestore...");

      // Get products from Firestore
      const allProducts = await fetchAllProducts();

      // Log product categories for debugging
      allProducts.forEach((product) => {
        console.log(`Product ${product.id} has category: ${product.category}`);
      });

      console.log(`Loaded ${allProducts.length} products from Firestore`);
      setProducts(allProducts);

      // Filter products if a category is selected
      if (selectedCategory && selectedCategory !== "all") {
        filterProductsByCategory(selectedCategory, allProducts);
      } else {
        setFilteredProducts(allProducts);
      }
    } catch (error) {
      console.error("Error loading products:", error);
      setError("Failed to load products. Pull down to refresh.");
    } finally {
      setLoading(false);
    }
  };

  const filterProductsByCategory = (category: string, productsList: any[]) => {
    if (!productsList || productsList.length === 0) {
      setFilteredProducts([]);
      return;
    }

    if (!category || category === "all") {
      setFilteredProducts(productsList);
      return;
    }

    // If we need products from a specific category, try to load directly from Firebase first
    if (category !== "all") {
      fetchProductsByCategory(category)
        .then((categoryProducts) => {
          if (categoryProducts && categoryProducts.length > 0) {
            console.log(
              `Loaded ${categoryProducts.length} products directly for category ${category}`
            );
            setFilteredProducts(categoryProducts);
            return;
          }

          // Fallback to local filtering if direct category fetch returns no results
          const filtered = productsList.filter(
            (product) => product.category === category
          );

          console.log(
            `Filtered ${filtered.length} products for category: ${category}`
          );
          setFilteredProducts(filtered);
        })
        .catch((error) => {
          console.error(`Error fetching category ${category}:`, error);
          // Fallback to local filtering
          const filtered = productsList.filter(
            (product) => product.category === category
          );
          setFilteredProducts(filtered);
        });
    } else {
      setFilteredProducts(productsList);
    }
  };

  // Handle manual refresh
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      console.log("Manually refreshing shop screen data...");

      // Clear all caches to force fresh data load
      await clearProductCache();

      // Fetch products directly from Firestore
      await loadProducts();

      // Update last refresh time
      console.log("Shop screen refresh complete");
    } catch (error) {
      console.error("Error refreshing shop data:", error);
      setError("Failed to refresh. Pull down to try again.");
    } finally {
      setRefreshing(false);
    }
  };

  const handleManualCacheClear = async () => {
    try {
      console.log("Manually clearing all product caches...");
      await clearProductCache();
      alert("Cache cleared! Pull down to reload fresh data.");
    } catch (error) {
      console.error("Failed to clear cache:", error);
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    console.log(`Selected category: ${categoryId}`);
    setSelectedCategory(categoryId);
  };

  const handleProductPress = (product: any) => {
    navigation.navigate("ProductDetail", { product });
  };

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0A74FF" />
        <Text style={styles.loaderText}>Loading products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <MaterialIcons name="error-outline" size={50} color="red" />
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>KIXORD</Text>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => navigation.navigate("Search")}
        >
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Category filter */}
      <View style={styles.categoryFilterContainer}>
        <View style={styles.categoryFilterScroll}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryFilterItem,
                selectedCategory === category.id &&
                  styles.selectedCategoryFilterItem,
              ]}
              onPress={() => handleCategorySelect(category.id)}
            >
              <MaterialIcons
                name={category.icon as any}
                size={28}
                color={selectedCategory === category.id ? "#fff" : "#333"}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Debug Button - Remove in production */}
      <TouchableOpacity
        style={styles.debugButton}
        onPress={handleManualCacheClear}
      >
        <Text style={styles.debugButtonText}>Debug: Clear Cache</Text>
      </TouchableOpacity>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0A74FF" />
          <Text style={styles.loadingText}>Loading Products...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => (
            <ProductItem
              item={item}
              onPress={() => handleProductPress(item)}
              isFavorite={!!favorites[item.id]}
              onToggleFavorite={toggleFavorite}
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.productGrid}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <MaterialIcons name="category" size={60} color="#ccc" />
              <Text style={styles.emptyText}>
                No products found in this category
              </Text>
              <TouchableOpacity
                style={styles.viewAllButton}
                onPress={() => setSelectedCategory("all")}
              >
                <Text style={styles.viewAllButtonText}>View All Products</Text>
              </TouchableOpacity>
            </View>
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#0A74FF"]}
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 15,
    backgroundColor: "#000",
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
  categoryFilterContainer: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  categoryFilterScroll: {
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryFilterItem: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    flex: 1,
    marginHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 50,
    height: 50,
  },
  selectedCategoryFilterItem: {
    backgroundColor: "#0A74FF",
  },
  categoryFilterText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#333",
    marginTop: 4,
  },
  selectedCategoryFilterText: {
    color: "#fff",
  },
  listContent: {
    padding: 12,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: "#0A74FF",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    marginTop: 60,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: "#999",
    marginBottom: 20,
  },
  viewAllButton: {
    backgroundColor: "#0A74FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  viewAllButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#0A74FF",
  },
  productGrid: {
    padding: 16,
  },
  debugButton: {
    backgroundColor: "#f0f0f0",
    padding: 8,
    margin: 8,
    borderRadius: 4,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  debugButtonText: {
    color: "#666",
    fontSize: 12,
  },
});

export default ShopScreen;
