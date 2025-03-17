import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Share } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import WhatsAppWidget from "../components/whatsapp-widget"

const OrderConfirmationScreen = ({ route, navigation }) => {
  const { orderNumber, total } = route.params

  const estimatedDelivery = () => {
    const today = new Date()
    const deliveryDate = new Date(today)
    deliveryDate.setDate(today.getDate() + 5) // Delivery in 5 days

    return deliveryDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
  }

  const handleShare = async () => {
    try {
      await Share.share({
        message: `I just ordered some awesome sneakers from Kixord! Order #${orderNumber}. Check them out at www.kixord.store`,
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleTrackOrder = () => {
    navigation.navigate("OrderTracking", { orderNumber })
  }

  const handleContinueShopping = () => {
    navigation.navigate("Shop")
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.successContainer}>
          <View style={styles.checkCircle}>
            <Ionicons name="checkmark" size={50} color="#FFF" />
          </View>
          <Text style={styles.successTitle}>Order Confirmed!</Text>
          <Text style={styles.successMessage}>Your order has been placed successfully.</Text>
        </View>

        <View style={styles.orderInfoContainer}>
          <View style={styles.orderInfoItem}>
            <Text style={styles.orderInfoLabel}>Order Number</Text>
            <Text style={styles.orderInfoValue}>{orderNumber}</Text>
          </View>

          <View style={styles.orderInfoItem}>
            <Text style={styles.orderInfoLabel}>Order Date</Text>
            <Text style={styles.orderInfoValue}>
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </View>

          <View style={styles.orderInfoItem}>
            <Text style={styles.orderInfoLabel}>Estimated Delivery</Text>
            <Text style={styles.orderInfoValue}>{estimatedDelivery()}</Text>
          </View>

          <View style={styles.orderInfoItem}>
            <Text style={styles.orderInfoLabel}>Total Amount</Text>
            <Text style={styles.orderInfoValue}>${total.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.nextStepsContainer}>
          <Text style={styles.nextStepsTitle}>What's Next?</Text>

          <View style={styles.stepItem}>
            <View style={styles.stepIconContainer}>
              <Ionicons name="mail-outline" size={24} color="#E32636" />
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Order Confirmation Email</Text>
              <Text style={styles.stepDescription}>We've sent a confirmation email with your order details.</Text>
            </View>
          </View>

          <View style={styles.stepItem}>
            <View style={styles.stepIconContainer}>
              <Ionicons name="cube-outline" size={24} color="#E32636" />
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Order Processing</Text>
              <Text style={styles.stepDescription}>We're preparing your order for shipment.</Text>
            </View>
          </View>

          <View style={styles.stepItem}>
            <View style={styles.stepIconContainer}>
              <Ionicons name="car-outline" size={24} color="#E32636" />
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Shipping</Text>
              <Text style={styles.stepDescription}>
                Your order will be shipped soon. You'll receive a tracking number.
              </Text>
            </View>
          </View>

          <View style={styles.stepItem}>
            <View style={styles.stepIconContainer}>
              <Ionicons name="home-outline" size={24} color="#E32636" />
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Delivery</Text>
              <Text style={styles.stepDescription}>Your order will be delivered to your shipping address.</Text>
            </View>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleTrackOrder}>
            <Text style={styles.primaryButtonText}>Track Order</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={handleContinueShopping}>
            <Text style={styles.secondaryButtonText}>Continue Shopping</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Ionicons name="share-social-outline" size={20} color="#E32636" />
            <Text style={styles.shareButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
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
  scrollContent: {
    padding: 16,
  },
  successContainer: {
    alignItems: "center",
    marginVertical: 24,
  },
  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  orderInfoContainer: {
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  orderInfoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  orderInfoLabel: {
    fontSize: 14,
    color: "#666",
  },
  orderInfoValue: {
    fontSize: 14,
    fontWeight: "bold",
  },
  nextStepsContainer: {
    marginBottom: 24,
  },
  nextStepsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  stepItem: {
    flexDirection: "row",
    marginBottom: 16,
  },
  stepIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(227, 38, 54, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: "#666",
  },
  actionsContainer: {
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: "#E32636",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 12,
  },
  secondaryButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
  shareButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
  },
  shareButtonText: {
    color: "#E32636",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
})

export default OrderConfirmationScreen

