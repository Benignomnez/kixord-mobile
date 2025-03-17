import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import WhatsAppWidget from "../components/whatsapp-widget"

// Sample cart data
const cartItems = [
  {
    id: "1",
    name: "LIGHTWEIGHT RUNNING CASUAL SNEAKERS",
    price: 250.0,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tenni.jpg-MxNLFNOPIGovX9C0oQCK3qzVF35Zxd.jpeg",
    quantity: 1,
    size: "8",
    color: "White/Blue",
  },
  {
    id: "2",
    name: "URBAN STREET STYLE PREMIUM SNEAKERS",
    price: 199.99,
    image:
      "https://sjc.microlink.io/65rnUpQJ8Yb-aVCAUoWLMRYyEiaYnxi4yW1A8F-XCYIl_-LOsw1sQ8f9cCR0Xjo18CvBduno7zQUu2cgS5gSwg.jpeg",
    quantity: 2,
    size: "9",
    color: "Multi",
  },
]

const CartScreen = ({ navigation }) => {
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const subtotal = calculateSubtotal()
  const shipping = 15.0
  const total = subtotal + shipping

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.itemMeta}>
          Size: {item.size} | Color: {item.color}
        </Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.quantityButton}>
            <Ionicons name="remove" size={16} color="#000" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity style={styles.quantityButton}>
            <Ionicons name="add" size={16} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.removeButton}>
        <Ionicons name="trash-outline" size={20} color="#999" />
      </TouchableOpacity>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
        <Text style={styles.itemCount}>{cartItems.length} items</Text>
      </View>

      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.cartList}
          />

          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>${shipping.toFixed(2)}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>

            <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate("Checkout")}>
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.emptyCartContainer}>
          <Ionicons name="cart-outline" size={80} color="#DDD" />
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
          <Text style={styles.emptyCartSubtext}>Add some items to get started</Text>
          <TouchableOpacity style={styles.shopNowButton} onPress={() => navigation.navigate("Shop")}>
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
  cartList: {
    padding: 16,
  },
  cartItem: {
    flexDirection: "row",
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  itemMeta: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#E32636",
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#EEE",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    marginHorizontal: 12,
    fontSize: 14,
    fontWeight: "bold",
  },
  removeButton: {
    padding: 8,
  },
  summaryContainer: {
    padding: 16,
    backgroundColor: "#F9F9F9",
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "500",
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E32636",
  },
  checkoutButton: {
    backgroundColor: "#E32636",
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyCartText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  emptyCartSubtext: {
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

export default CartScreen

