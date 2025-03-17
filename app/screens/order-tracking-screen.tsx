"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import WhatsAppWidget from "../components/whatsapp-widget"

// Sample order data
const orderItems = [
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

const OrderTrackingScreen = ({ route, navigation }) => {
  const { orderNumber } = route.params
  const [activeTab, setActiveTab] = useState("tracking")

  // Sample tracking data
  const trackingSteps = [
    {
      id: 1,
      title: "Order Placed",
      description: "Your order has been confirmed",
      date: "Mar 15, 2025",
      time: "10:30 AM",
      completed: true,
    },
    {
      id: 2,
      title: "Processing",
      description: "Your order is being prepared",
      date: "Mar 15, 2025",
      time: "2:45 PM",
      completed: true,
    },
    {
      id: 3,
      title: "Shipped",
      description: "Your order has been shipped",
      date: "Mar 16, 2025",
      time: "9:15 AM",
      completed: true,
    },
    {
      id: 4,
      title: "Out for Delivery",
      description: "Your order is out for delivery",
      date: "Mar 20, 2025",
      time: "8:30 AM",
      completed: false,
    },
    {
      id: 5,
      title: "Delivered",
      description: "Package will be delivered today",
      date: "Mar 20, 2025",
      time: "Expected by 8:00 PM",
      completed: false,
    },
  ]

  const calculateSubtotal = () => {
    return orderItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const subtotal = calculateSubtotal()
  const shipping = 15.0
  const tax = subtotal * 0.07 // 7% tax
  const total = subtotal + shipping + tax

  const renderTrackingTab = () => (
    <View style={styles.trackingContainer}>
      <View style={styles.trackingHeader}>
        <View style={styles.trackingInfo}>
          <Text style={styles.trackingLabel}>Tracking Number</Text>
          <Text style={styles.trackingNumber}>TRK123456789</Text>
        </View>
        <View style={styles.trackingInfo}>
          <Text style={styles.trackingLabel}>Carrier</Text>
          <Text style={styles.trackingCarrier}>FedEx</Text>
        </View>
      </View>

      <View style={styles.estimatedDelivery}>
        <Text style={styles.estimatedDeliveryLabel}>Estimated Delivery</Text>
        <Text style={styles.estimatedDeliveryDate}>Monday, March 20, 2025</Text>
      </View>

      <View style={styles.trackingStepsContainer}>
        {trackingSteps.map((step, index) => (
          <View key={step.id} style={styles.trackingStep}>
            <View style={styles.stepIndicatorContainer}>
              <View style={[styles.stepIndicator, step.completed && styles.completedStepIndicator]}>
                {step.completed ? (
                  <Ionicons name="checkmark" size={16} color="#FFF" />
                ) : (
                  <Text style={styles.stepNumber}>{step.id}</Text>
                )}
              </View>
              {index < trackingSteps.length - 1 && (
                <View style={[styles.stepLine, trackingSteps[index + 1].completed && styles.completedStepLine]} />
              )}
            </View>

            <View style={styles.stepContent}>
              <View style={styles.stepHeader}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDate}>{step.date}</Text>
              </View>
              <Text style={styles.stepDescription}>{step.description}</Text>
              <Text style={styles.stepTime}>{step.time}</Text>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.trackingButton}>
        <Ionicons name="open-outline" size={20} color="#FFF" style={styles.trackingButtonIcon} />
        <Text style={styles.trackingButtonText}>View Detailed Tracking</Text>
      </TouchableOpacity>
    </View>
  )

  const renderDetailsTab = () => (
    <View style={styles.detailsContainer}>
      <View style={styles.orderInfoSection}>
        <Text style={styles.sectionTitle}>Order Information</Text>
        <View style={styles.orderInfoItem}>
          <Text style={styles.orderInfoLabel}>Order Number</Text>
          <Text style={styles.orderInfoValue}>{orderNumber}</Text>
        </View>
        <View style={styles.orderInfoItem}>
          <Text style={styles.orderInfoLabel}>Order Date</Text>
          <Text style={styles.orderInfoValue}>March 15, 2025</Text>
        </View>
        <View style={styles.orderInfoItem}>
          <Text style={styles.orderInfoLabel}>Payment Method</Text>
          <Text style={styles.orderInfoValue}>Credit Card (**** 1234)</Text>
        </View>
      </View>

      <View style={styles.shippingSection}>
        <Text style={styles.sectionTitle}>Shipping Address</Text>
        <Text style={styles.addressText}>John Doe</Text>
        <Text style={styles.addressText}>123 Main Street</Text>
        <Text style={styles.addressText}>Apt 4B</Text>
        <Text style={styles.addressText}>New York, NY 10001</Text>
        <Text style={styles.addressText}>United States</Text>
        <Text style={styles.addressText}>+1 (234) 567-8901</Text>
      </View>

      <View style={styles.itemsSection}>
        <Text style={styles.sectionTitle}>Items</Text>
        {orderItems.map((item) => (
          <View key={item.id} style={styles.orderItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName} numberOfLines={2}>
                {item.name}
              </Text>
              <Text style={styles.itemMeta}>
                Size: {item.size} | Color: {item.color}
              </Text>
              <Text style={styles.itemMeta}>Quantity: {item.quantity}</Text>
              <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.summarySection}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Shipping</Text>
          <Text style={styles.summaryValue}>${shipping.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tax</Text>
          <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order #{orderNumber}</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "tracking" && styles.activeTab]}
          onPress={() => setActiveTab("tracking")}
        >
          <Text style={[styles.tabText, activeTab === "tracking" && styles.activeTabText]}>Tracking</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "details" && styles.activeTab]}
          onPress={() => setActiveTab("details")}
        >
          <Text style={[styles.tabText, activeTab === "details" && styles.activeTabText]}>Order Details</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {activeTab === "tracking" ? renderTrackingTab() : renderDetailsTab()}
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#E32636",
  },
  tabText: {
    fontSize: 16,
    color: "#666",
  },
  activeTabText: {
    color: "#E32636",
    fontWeight: "bold",
  },
  scrollContent: {
    padding: 16,
  },
  trackingContainer: {
    marginBottom: 24,
  },
  trackingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  trackingInfo: {
    flex: 1,
  },
  trackingLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  trackingNumber: {
    fontSize: 14,
    fontWeight: "bold",
  },
  trackingCarrier: {
    fontSize: 14,
    fontWeight: "bold",
  },
  estimatedDelivery: {
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  estimatedDeliveryLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  estimatedDeliveryDate: {
    fontSize: 16,
    fontWeight: "bold",
  },
  trackingStepsContainer: {
    marginBottom: 24,
  },
  trackingStep: {
    flexDirection: "row",
    marginBottom: 16,
  },
  stepIndicatorContainer: {
    alignItems: "center",
    marginRight: 16,
  },
  stepIndicator: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#DDD",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  completedStepIndicator: {
    backgroundColor: "#4CAF50",
  },
  stepNumber: {
    color: "#FFF",
    fontWeight: "bold",
  },
  stepLine: {
    width: 2,
    height: 40,
    backgroundColor: "#DDD",
  },
  completedStepLine: {
    backgroundColor: "#4CAF50",
  },
  stepContent: {
    flex: 1,
  },
  stepHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  stepDate: {
    fontSize: 12,
    color: "#666",
  },
  stepDescription: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  stepTime: {
    fontSize: 12,
    color: "#666",
  },
  trackingButton: {
    backgroundColor: "#E32636",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  trackingButtonIcon: {
    marginRight: 8,
  },
  trackingButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  detailsContainer: {
    marginBottom: 24,
  },
  orderInfoSection: {
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  orderInfoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  orderInfoLabel: {
    fontSize: 14,
    color: "#666",
  },
  orderInfoValue: {
    fontSize: 14,
    fontWeight: "500",
  },
  shippingSection: {
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  addressText: {
    fontSize: 14,
    marginBottom: 4,
  },
  itemsSection: {
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: "row",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  itemImage: {
    width: 70,
    height: 70,
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
    fontSize: 14,
    fontWeight: "bold",
    color: "#E32636",
  },
  summarySection: {
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    padding: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
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
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
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
})

export default OrderTrackingScreen

