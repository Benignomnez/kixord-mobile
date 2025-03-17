import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import WhatsAppWidget from "../components/whatsapp-widget"

// Sample favorites data
const favoriteItems = [
  {
    id: "1",
    name: "LIGHTWEIGHT RUNNING CASUAL SNEAKERS SHOE",
    price: 250.0,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tenni.jpg-MxNLFNOPIGovX9C0oQCK3qzVF35Zxd.jpeg",
    category: "Man Sneakers - 7,8",
  },
  {
    id: "2",
    name: "URBAN STREET STYLE PREMIUM SNEAKERS",
    price: 199.99,
    image:
      "https://sjc.microlink.io/65rnUpQJ8Yb-aVCAUoWLMRYyEiaYnxi4yW1A8F-XCYIl_-LOsw1sQ8f9cCR0Xjo18CvBduno7zQUu2cgS5gSwg.jpeg",
    category: "Man Sneakers - 8,9",
  },
  {
    id: "3",
    name: "CLASSIC RETRO ATHLETIC SHOES",
    price: 175.5,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tenni.jpg-MxNLFNOPIGovX9C0oQCK3qzVF35Zxd.jpeg",
    category: "Man Sneakers - 9,10",
  },
]

const FavoritesScreen = ({ navigation }) => {
  const renderFavoriteItem = ({ item }) => (
    <View style={styles.favoriteItem}>
      <TouchableOpacity onPress={() => navigation.navigate("ProductDetail", { product: item })}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
      </TouchableOpacity>
      <View style={styles.itemDetails}>
        <TouchableOpacity onPress={() => navigation.navigate("ProductDetail", { product: item })}>
          <Text style={styles.itemName} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.itemCategory}>{item.category}</Text>
          <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        </TouchableOpacity>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.addToCartButton}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.removeButton}>
            <Ionicons name="trash-outline" size={20} color="#999" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Wishlist</Text>
        <Text style={styles.itemCount}>{favoriteItems.length} items</Text>
      </View>

      {favoriteItems.length > 0 ? (
        <FlatList
          data={favoriteItems}
          renderItem={renderFavoriteItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.favoritesList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={80} color="#DDD" />
          <Text style={styles.emptyText}>Your wishlist is empty</Text>
          <Text style={styles.emptySubtext}>Save items you like to your wishlist</Text>
          <TouchableOpacity style={styles.shopNowButton}>
            <Text style={styles.shopNowButtonText}>Shop Now</Text>
          </TouchableOpacity>
        </View>
      )}

      <WhatsAppWidget phoneNumber="18499275780" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  itemCount: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  favoritesList: {
    padding: 16,
  },
  favoriteItem: {
    flexDirection: "row",
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  itemName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  itemCategory: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#E32636",
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  addToCartButton: {
    backgroundColor: "#E32636",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flex: 1,
    marginRight: 8,
  },
  addToCartText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  removeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#EEE",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
    marginBottom: 30,
  },
  shopNowButton: {
    backgroundColor: "#E32636",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  shopNowButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default FavoritesScreen

