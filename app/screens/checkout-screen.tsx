"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, SafeAreaView, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"

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

const CheckoutScreen = ({ navigation }) => {
  const [activeStep, setActiveStep] = useState(1)
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phone: "",
  })
  const [paymentMethod, setPaymentMethod] = useState("creditCard")
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
  })

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const subtotal = calculateSubtotal()
  const shipping = 15.0
  const tax = subtotal * 0.07 // 7% tax
  const total = subtotal + shipping + tax

  const handleNextStep = () => {
    if (activeStep === 1) {
      // Validate shipping address
      if (
        !shippingAddress.fullName ||
        !shippingAddress.addressLine1 ||
        !shippingAddress.city ||
        !shippingAddress.state ||
        !shippingAddress.zipCode ||
        !shippingAddress.phone
      ) {
        Alert.alert("Error", "Please fill in all required fields")
        return
      }
    } else if (activeStep === 2) {
      // Validate payment details
      if (paymentMethod === "creditCard") {
        if (!cardDetails.cardNumber || !cardDetails.cardholderName || !cardDetails.expiryDate || !cardDetails.cvv) {
          Alert.alert("Error", "Please fill in all card details")
          return
        }
      }
    } else if (activeStep === 3) {
      // Place order
      Alert.alert("Order Placed", "Your order has been successfully placed!", [
        {
          text: "OK",
          onPress: () =>
            navigation.navigate("OrderConfirmation", {
              orderNumber: "KIX" + Math.floor(100000 + Math.random() * 900000),
              total: total,
            }),
        },
      ])
      return
    }

    setActiveStep(activeStep + 1)
  }

  const handlePreviousStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1)
    } else {
      navigation.goBack()
    }
  }

  const renderOrderSummary = () => (
    <View style={styles.orderSummary}>
      <Text style={styles.sectionTitle}>Order Summary</Text>

      {cartItems.map((item) => (
        <View key={item.id} style={styles.summaryItem}>
          <Text style={styles.summaryItemName} numberOfLines={1}>
            {item.name} ({item.quantity})
          </Text>
          <Text style={styles.summaryItemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
        </View>
      ))}

      <View style={styles.divider} />

      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Subtotal</Text>
        <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
      </View>

      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Shipping</Text>
        <Text style={styles.summaryValue}>${shipping.toFixed(2)}</Text>
      </View>

      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Tax (7%)</Text>
        <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
      </View>

      <View style={[styles.summaryRow, styles.totalRow]}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
      </View>
    </View>
  )

  const renderShippingStep = () => (
    <View style={styles.formContainer}>
      <Text style={styles.sectionTitle}>Shipping Address</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Full Name *</Text>
        <TextInput
          style={styles.input}
          value={shippingAddress.fullName}
          onChangeText={(text) => setShippingAddress({ ...shippingAddress, fullName: text })}
          placeholder="Enter your full name"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Address Line 1 *</Text>
        <TextInput
          style={styles.input}
          value={shippingAddress.addressLine1}
          onChangeText={(text) => setShippingAddress({ ...shippingAddress, addressLine1: text })}
          placeholder="Street address, P.O. box"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Address Line 2</Text>
        <TextInput
          style={styles.input}
          value={shippingAddress.addressLine2}
          onChangeText={(text) => setShippingAddress({ ...shippingAddress, addressLine2: text })}
          placeholder="Apartment, suite, unit, building, floor, etc."
        />
      </View>

      <View style={styles.rowInputs}>
        <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
          <Text style={styles.inputLabel}>City *</Text>
          <TextInput
            style={styles.input}
            value={shippingAddress.city}
            onChangeText={(text) => setShippingAddress({ ...shippingAddress, city: text })}
            placeholder="City"
          />
        </View>

        <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
          <Text style={styles.inputLabel}>State/Province *</Text>
          <TextInput
            style={styles.input}
            value={shippingAddress.state}
            onChangeText={(text) => setShippingAddress({ ...shippingAddress, state: text })}
            placeholder="State"
          />
        </View>
      </View>

      <View style={styles.rowInputs}>
        <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
          <Text style={styles.inputLabel}>ZIP Code *</Text>
          <TextInput
            style={styles.input}
            value={shippingAddress.zipCode}
            onChangeText={(text) => setShippingAddress({ ...shippingAddress, zipCode: text })}
            placeholder="ZIP Code"
            keyboardType="numeric"
          />
        </View>

        <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
          <Text style={styles.inputLabel}>Country *</Text>
          <TextInput
            style={styles.input}
            value={shippingAddress.country}
            onChangeText={(text) => setShippingAddress({ ...shippingAddress, country: text })}
            placeholder="Country"
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Phone Number *</Text>
        <TextInput
          style={styles.input}
          value={shippingAddress.phone}
          onChangeText={(text) => setShippingAddress({ ...shippingAddress, phone: text })}
          placeholder="For delivery questions only"
          keyboardType="phone-pad"
        />
      </View>
    </View>
  )

  const renderPaymentStep = () => (
    <View style={styles.formContainer}>
      <Text style={styles.sectionTitle}>Payment Method</Text>

      <View style={styles.paymentOptions}>
        <TouchableOpacity
          style={[styles.paymentOption, paymentMethod === "creditCard" && styles.selectedPaymentOption]}
          onPress={() => setPaymentMethod("creditCard")}
        >
          <Ionicons name="card-outline" size={24} color={paymentMethod === "creditCard" ? "#E32636" : "#666"} />
          <Text style={[styles.paymentOptionText, paymentMethod === "creditCard" && styles.selectedPaymentOptionText]}>
            Credit Card
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.paymentOption, paymentMethod === "paypal" && styles.selectedPaymentOption]}
          onPress={() => setPaymentMethod("paypal")}
        >
          <Ionicons name="logo-paypal" size={24} color={paymentMethod === "paypal" ? "#E32636" : "#666"} />
          <Text style={[styles.paymentOptionText, paymentMethod === "paypal" && styles.selectedPaymentOptionText]}>
            PayPal
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.paymentOption, paymentMethod === "applePay" && styles.selectedPaymentOption]}
          onPress={() => setPaymentMethod("applePay")}
        >
          <Ionicons name="logo-apple" size={24} color={paymentMethod === "applePay" ? "#E32636" : "#666"} />
          <Text style={[styles.paymentOptionText, paymentMethod === "applePay" && styles.selectedPaymentOptionText]}>
            Apple Pay
          </Text>
        </TouchableOpacity>
      </View>

      {paymentMethod === "creditCard" && (
        <View style={styles.cardDetailsContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Card Number</Text>
            <TextInput
              style={styles.input}
              value={cardDetails.cardNumber}
              onChangeText={(text) => setCardDetails({ ...cardDetails, cardNumber: text })}
              placeholder="1234 5678 9012 3456"
              keyboardType="numeric"
              maxLength={19}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Cardholder Name</Text>
            <TextInput
              style={styles.input}
              value={cardDetails.cardholderName}
              onChangeText={(text) => setCardDetails({ ...cardDetails, cardholderName: text })}
              placeholder="Name on card"
            />
          </View>

          <View style={styles.rowInputs}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.inputLabel}>Expiry Date</Text>
              <TextInput
                style={styles.input}
                value={cardDetails.expiryDate}
                onChangeText={(text) => setCardDetails({ ...cardDetails, expiryDate: text })}
                placeholder="MM/YY"
                maxLength={5}
              />
            </View>

            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.inputLabel}>CVV</Text>
              <TextInput
                style={styles.input}
                value={cardDetails.cvv}
                onChangeText={(text) => setCardDetails({ ...cardDetails, cvv: text })}
                placeholder="123"
                keyboardType="numeric"
                maxLength={4}
                secureTextEntry
              />
            </View>
          </View>
        </View>
      )}

      {paymentMethod === "paypal" && (
        <View style={styles.alternativePaymentContainer}>
          <Text style={styles.alternativePaymentText}>
            You will be redirected to PayPal to complete your payment securely.
          </Text>
        </View>
      )}

      {paymentMethod === "applePay" && (
        <View style={styles.alternativePaymentContainer}>
          <Text style={styles.alternativePaymentText}>You will be prompted to confirm payment with Apple Pay.</Text>
        </View>
      )}
    </View>
  )

  const renderReviewStep = () => (
    <View style={styles.reviewContainer}>
      <Text style={styles.sectionTitle}>Review Your Order</Text>

      <View style={styles.reviewSection}>
        <View style={styles.reviewHeader}>
          <Text style={styles.reviewSectionTitle}>Shipping Address</Text>
          <TouchableOpacity onPress={() => setActiveStep(1)}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.reviewText}>{shippingAddress.fullName}</Text>
        <Text style={styles.reviewText}>{shippingAddress.addressLine1}</Text>
        {shippingAddress.addressLine2 && <Text style={styles.reviewText}>{shippingAddress.addressLine2}</Text>}
        <Text style={styles.reviewText}>
          {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
        </Text>
        <Text style={styles.reviewText}>{shippingAddress.country}</Text>
        <Text style={styles.reviewText}>{shippingAddress.phone}</Text>
      </View>

      <View style={styles.reviewSection}>
        <View style={styles.reviewHeader}>
          <Text style={styles.reviewSectionTitle}>Payment Method</Text>
          <TouchableOpacity onPress={() => setActiveStep(2)}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {paymentMethod === "creditCard" && (
          <>
            <Text style={styles.reviewText}>Credit Card</Text>
            <Text style={styles.reviewText}>**** **** **** {cardDetails.cardNumber.slice(-4)}</Text>
            <Text style={styles.reviewText}>{cardDetails.cardholderName}</Text>
          </>
        )}

        {paymentMethod === "paypal" && <Text style={styles.reviewText}>PayPal</Text>}

        {paymentMethod === "applePay" && <Text style={styles.reviewText}>Apple Pay</Text>}
      </View>

      <View style={styles.reviewSection}>
        <Text style={styles.reviewSectionTitle}>Items</Text>

        {cartItems.map((item) => (
          <View key={item.id} style={styles.reviewItem}>
            <Text style={styles.reviewItemName} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.reviewItemDetails}>
              Size: {item.size} | Color: {item.color} | Qty: {item.quantity}
            </Text>
            <Text style={styles.reviewItemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
          </View>
        ))}
      </View>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePreviousStep}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.stepIndicator}>
        <View style={[styles.stepItem, activeStep >= 1 && styles.activeStepItem]}>
          <View style={[styles.stepNumber, activeStep >= 1 && styles.activeStepNumber]}>
            <Text style={[styles.stepNumberText, activeStep >= 1 && styles.activeStepNumberText]}>1</Text>
          </View>
          <Text style={[styles.stepText, activeStep >= 1 && styles.activeStepText]}>Shipping</Text>
        </View>

        <View style={[styles.stepLine, activeStep >= 2 && styles.activeStepLine]} />

        <View style={[styles.stepItem, activeStep >= 2 && styles.activeStepItem]}>
          <View style={[styles.stepNumber, activeStep >= 2 && styles.activeStepNumber]}>
            <Text style={[styles.stepNumberText, activeStep >= 2 && styles.activeStepNumberText]}>2</Text>
          </View>
          <Text style={[styles.stepText, activeStep >= 2 && styles.activeStepText]}>Payment</Text>
        </View>

        <View style={[styles.stepLine, activeStep >= 3 && styles.activeStepLine]} />

        <View style={[styles.stepItem, activeStep >= 3 && styles.activeStepItem]}>
          <View style={[styles.stepNumber, activeStep >= 3 && styles.activeStepNumber]}>
            <Text style={[styles.stepNumberText, activeStep >= 3 && styles.activeStepNumberText]}>3</Text>
          </View>
          <Text style={[styles.stepText, activeStep >= 3 && styles.activeStepText]}>Review</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {activeStep === 1 && renderShippingStep()}
        {activeStep === 2 && renderPaymentStep()}
        {activeStep === 3 && renderReviewStep()}

        {renderOrderSummary()}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={handleNextStep}>
          <Text style={styles.footerButtonText}>{activeStep === 3 ? "Place Order" : "Continue"}</Text>
        </TouchableOpacity>
      </View>
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
  stepIndicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#F9F9F9",
  },
  stepItem: {
    alignItems: "center",
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#DDD",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  activeStepNumber: {
    backgroundColor: "#E32636",
  },
  stepNumberText: {
    color: "#666",
    fontWeight: "bold",
    fontSize: 14,
  },
  activeStepNumberText: {
    color: "#FFF",
  },
  stepText: {
    fontSize: 12,
    color: "#666",
  },
  activeStepText: {
    color: "#E32636",
    fontWeight: "bold",
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#DDD",
    marginHorizontal: 8,
  },
  activeStepLine: {
    backgroundColor: "#E32636",
  },
  scrollContent: {
    padding: 16,
  },
  formContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  rowInputs: {
    flexDirection: "row",
  },
  paymentOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  paymentOption: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    marginHorizontal: 4,
  },
  selectedPaymentOption: {
    borderColor: "#E32636",
    backgroundColor: "rgba(227, 38, 54, 0.05)",
  },
  paymentOptionText: {
    marginTop: 8,
    fontSize: 14,
    color: "#666",
  },
  selectedPaymentOptionText: {
    color: "#E32636",
    fontWeight: "bold",
  },
  cardDetailsContainer: {
    marginTop: 8,
  },
  alternativePaymentContainer: {
    padding: 16,
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    marginTop: 8,
  },
  alternativePaymentText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  orderSummary: {
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  summaryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryItemName: {
    fontSize: 14,
    flex: 1,
    marginRight: 8,
  },
  summaryItemPrice: {
    fontSize: 14,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#EEE",
    marginVertical: 12,
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
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    backgroundColor: "#FFF",
  },
  footerButton: {
    backgroundColor: "#E32636",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
  },
  footerButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  reviewContainer: {
    marginBottom: 24,
  },
  reviewSection: {
    marginBottom: 20,
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    padding: 16,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  reviewSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  editText: {
    color: "#E32636",
    fontSize: 14,
  },
  reviewText: {
    fontSize: 14,
    marginBottom: 4,
  },
  reviewItem: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  reviewItemName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  reviewItemDetails: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  reviewItemPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#E32636",
  },
})

export default CheckoutScreen

