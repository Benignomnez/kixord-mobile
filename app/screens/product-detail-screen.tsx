"use client";

import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import WhatsAppWidget from "../components/whatsapp-widget";
import ProductReview from "../components/product-review";
import { fetchProductById } from "../utils/firebase-products";

const { width } = Dimensions.get("window");

const ProductDetailScreen = ({ route, navigation }) => {
  const { product: initialProduct } = route.params;
  const [product, setProduct] = useState(initialProduct);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sizes = ["7", "8", "9", "10", "11"];
  const colors = [
    { name: "Black", code: "#000000" },
    { name: "White", code: "#FFFFFF" },
    { name: "Red", code: "#E32636" },
  ];

  useEffect(() => {
    // Load the full product details from Firebase
    const loadProductDetails = async () => {
      try {
        setLoading(true);
        const productDetails = await fetchProductById(initialProduct.id);
        if (productDetails) {
          setProduct(productDetails);

          // Set default selected size and color if available
          if (productDetails.sizes && productDetails.sizes.length > 0) {
            setSelectedSize(productDetails.sizes[0]);
          }

          if (productDetails.colors && productDetails.colors.length > 0) {
            setSelectedColor(productDetails.colors[0]);
          }

          setError(null);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error("Error loading product details:", err);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    loadProductDetails();
  }, [initialProduct.id]);

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const renderProductContent = () => (
    <>
      <Image source={{ uri: product.image }} style={styles.productImage} />

      <View style={styles.detailsContainer}>
        <View style={styles.header}>
          <Text style={styles.productName}>{product.name}</Text>
          <TouchableOpacity style={styles.favoriteButton}>
            <Ionicons
              name={product.isFavorite ? "heart" : "heart-outline"}
              size={24}
              color={product.isFavorite ? "#E32636" : "#000"}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.ratingContainer}>
          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons
                key={star}
                name={star <= 4 ? "star" : "star-outline"}
                size={18}
                color={star <= 4 ? "#FFD700" : "#999"}
                style={{ marginRight: 2 }}
              />
            ))}
          </View>
          <Text style={styles.reviewCount}>(45 Reviews)</Text>
        </View>

        <Text style={styles.price}>${product.price.toFixed(2)}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            Shoe Island Player-X Trendy White Lightweight Running Sports Boys
            Men Casual Shoes Sneakers For Men. Class. Perfection. In-live.
            {"\n\n"}
            Flaunt a minimalistic and stylish statement as you adorn this pair
            of sneakers by Shoe Island. Featuring a synthetic upper material
            that ensures comfort and breathability.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Size</Text>
          <View style={styles.optionsContainer}>
            {sizes.map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeOption,
                  selectedSize === size && styles.selectedOption,
                ]}
                onPress={() => setSelectedSize(size)}
              >
                <Text
                  style={[
                    styles.sizeText,
                    selectedSize === size && styles.selectedOptionText,
                  ]}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Color</Text>
          <View style={styles.optionsContainer}>
            {colors.map((color) => (
              <TouchableOpacity
                key={color.name}
                style={[
                  styles.colorOption,
                  { backgroundColor: color.code },
                  selectedColor === color.name && styles.selectedColorOption,
                  color.code === "#FFFFFF" && styles.whiteColorBorder,
                ]}
                onPress={() => setSelectedColor(color.name)}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quantity</Text>
          <View style={styles.quantitySelector}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={decrementQuantity}
            >
              <Ionicons name="remove" size={20} color="#000" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={incrementQuantity}
            >
              <Ionicons name="add" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        <ProductReview productId={product.id} />
      </View>
    </>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E32636" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[{ key: "content" }]}
        renderItem={() => renderProductContent()}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => {
            // Add to cart logic would go here
            navigation.navigate("Cart");
          }}
        >
          <Text style={styles.addToCartText}>Add to cart</Text>
        </TouchableOpacity>
      </View>

      <WhatsAppWidget phoneNumber="18499275780" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  productImage: {
    width: width,
    height: width,
    resizeMode: "cover",
  },
  detailsContainer: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  productName: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    marginRight: 10,
  },
  favoriteButton: {
    padding: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  stars: {
    flexDirection: "row",
  },
  reviewCount: {
    marginLeft: 8,
    color: "#666",
    fontSize: 14,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#E32636",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: "#333",
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sizeOption: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: "#000",
    borderColor: "#000",
  },
  sizeText: {
    fontSize: 14,
    color: "#000",
  },
  selectedOptionText: {
    color: "#FFF",
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  selectedColorOption: {
    borderWidth: 2,
    borderColor: "#000",
  },
  whiteColorBorder: {
    borderWidth: 1,
    borderColor: "#DDD",
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    backgroundColor: "#FFF",
  },
  addToCartButton: {
    backgroundColor: "#E32636",
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: "center",
  },
  addToCartText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  errorText: {
    fontSize: 16,
    color: "#E32636",
    marginBottom: 20,
    textAlign: "center",
  },
  backButton: {
    backgroundColor: "#E32636",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default ProductDetailScreen;
