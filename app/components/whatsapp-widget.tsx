import type React from "react"
import { TouchableOpacity, StyleSheet, Linking } from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface WhatsAppWidgetProps {
  phoneNumber: string
}

const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({ phoneNumber }) => {
  const openWhatsApp = () => {
    // Remove any non-numeric characters from the phone number
    const formattedNumber = phoneNumber.replace(/\D/g, "")

    // Create the WhatsApp URL
    const whatsappUrl = `https://wa.me/${formattedNumber}`

    // Open WhatsApp
    Linking.canOpenURL(whatsappUrl)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(whatsappUrl)
        } else {
          console.log("WhatsApp is not installed on this device")
        }
      })
      .catch((err) => console.error("An error occurred", err))
  }

  return (
    <TouchableOpacity style={styles.whatsappButton} onPress={openWhatsApp}>
      <Ionicons name="logo-whatsapp" size={24} color="#FFFFFF" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  whatsappButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#25D366",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 999,
  },
})

export default WhatsAppWidget

