import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { getAuth, signOut } from "firebase/auth"
import WhatsAppWidget from "../components/whatsapp-widget"

const ProfileScreen = () => {
  const auth = getAuth()
  const user = auth.currentUser

  const handleSignOut = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Error signing out: ", error)
    }
  }

  const menuItems = [
    { icon: "person-outline", title: "Edit Profile", screen: "EditProfile" },
    { icon: "location-outline", title: "Shipping Address", screen: "ShippingAddress" },
    { icon: "card-outline", title: "Payment Methods", screen: "PaymentMethods" },
    { icon: "time-outline", title: "Order History", screen: "OrderHistory" },
    { icon: "heart-outline", title: "Wishlist", screen: "Favorites" },
    { icon: "settings-outline", title: "Settings", screen: "Settings" },
    { icon: "help-circle-outline", title: "Help & Support", screen: "Support" },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        <View style={styles.profileSection}>
          <Image
            source={{
              uri: "https://sjc.microlink.io/65rnUpQJ8Yb-aVCAUoWLMRYyEiaYnxi4yW1A8F-XCYIl_-LOsw1sQ8f9cCR0Xjo18CvBduno7zQUu2cgS5gSwg.jpeg",
            }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user?.displayName || "Kixord User"}</Text>
            <Text style={styles.profileEmail}>{user?.email || "user@example.com"}</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="create-outline" size={20} color="#E32636" />
          </TouchableOpacity>
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={[styles.statItem, styles.statBorder]}>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>In Cart</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Wishlist</Text>
          </View>
        </View>

        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <Ionicons name={item.icon} size={22} color="#333" />
              </View>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Ionicons name="log-out-outline" size={22} color="#E32636" style={styles.signOutIcon} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>

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
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#EEE",
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: "#666",
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statsSection: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#EEE",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
  },
  menuSection: {
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  menuTitle: {
    flex: 1,
    fontSize: 16,
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    marginBottom: 30,
    paddingVertical: 16,
    backgroundColor: "#FFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E32636",
  },
  signOutIcon: {
    marginRight: 8,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#E32636",
  },
})

export default ProfileScreen

